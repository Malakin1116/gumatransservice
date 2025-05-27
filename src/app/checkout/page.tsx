'use client';

import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useCart } from '../context/CartContext';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
  type?: string;
}

interface CartItem {
  tire: Tire;
  quantity: number;
}

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    bookTireChange: true,
    postalDelivery: false,
    postalCity: '',
    postalBranch: '',
    postalAddress: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasPriceOnRequest, setHasPriceOnRequest] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // Для уникнення невідповідності гідратації

  useEffect(() => {
    setIsMounted(true); // Помічаємо, що компонент змонтований на клієнті
    const hasPriceNull = cart.some((item: CartItem) => item.tire.price === null);
    setHasPriceOnRequest(hasPriceNull);

    const total = cart.reduce(
      (sum: number, item: CartItem) => sum + (item.tire.price || 0) * item.quantity,
      0
    );
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormData({
      ...formData,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const sendOrderToTelegram = async () => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Помилка: TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не визначені.');
      throw new Error('Налаштування Telegram некоректні');
    }

    const message = `
Нове замовлення:
Ім'я: ${formData.name}
Телефон: ${formData.phone}
${
  formData.bookTireChange
    ? 'Запис на перевзування: Так (ми зателефонуємо вам і оберемо найкращий варіант)'
    : 'Запис на перевзування: Ні'
}
${
  formData.postalDelivery
    ? `Доставка поштою: Так
Місто: ${formData.postalCity}
Номер відділення Нової Пошти: ${formData.postalBranch}
Адреса для кур’єрської доставки: ${formData.postalAddress || 'Не вказано'}`
    : 'Доставка поштою: Ні'
}
Товари:
${cart
  .map(
    (item: CartItem) =>
      `- ${item.tire.brand} ${item.tire.model} (${item.tire.size}) x${item.quantity} - ${item.tire.price ? `${(item.tire.price * item.quantity).toLocaleString()} грн` : 'Ціна за запитом'}`
  )
  .join('\n')}
Загальна сума: ${hasPriceOnRequest ? `${totalPrice.toLocaleString()} грн (деякі товари за запитом)` : `${totalPrice.toLocaleString()} грн`}
Час замовлення: ${new Date().toLocaleString()}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        console.error('Відповідь Telegram API:', data);
        throw new Error(`Помилка відправки в Telegram: ${data.description}`);
      }
      console.log('Повідомлення успішно відправлено в Telegram:', data);
    } catch (error) {
      console.error('Помилка відправки в Telegram:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert('Будь ласка, заповніть усі поля.');
      return;
    }
    if (cart.length === 0) {
      alert('Ваш кошик порожній.');
      return;
    }
    if (formData.postalDelivery && (!formData.postalCity || !formData.postalBranch)) {
      alert('Будь ласка, заповніть усі поля для доставки Новою Поштою.');
      return;
    }
    try {
      await sendOrderToTelegram();
      alert(`Дякуємо за замовлення, ${formData.name}! Ми зв’яжемося з вами за номером ${formData.phone}.`);
    } catch (error) {
      alert('Замовлення оформлено, але не вдалося відправити в Telegram. Ми зв’яжемося з вами.');
    }
    clearCart();
    setFormData({
      name: '',
      phone: '',
      bookTireChange: true,
      postalDelivery: false,
      postalCity: '',
      postalBranch: '',
      postalAddress: '',
    });
  };

  // Уникаємо рендерингу кошика на сервері до завершення гідратації
  if (!isMounted) {
    return null; // Повертаємо null на сервері, щоб уникнути невідповідності
  }

  return (
    <>
      <NextSeo
        title="Оформлення замовлення | ГУМАТРАНССЕРВІС"
        description="Оформіть замовлення шин та камер для вантажних автомобілів у ГУМАТРАНССЕРВІС. Швидке оформлення, доставка по Україні."
        canonical="https://gumatransservice.com/checkout"
        openGraph={{
          url: 'https://gumatransservice.com/checkout',
          title: 'Оформлення замовлення | ГУМАТРАНССЕРВІС',
          description: 'Оформіть замовлення шин та камер для вантажних автомобілів у ГУМАТРАНССЕРВІС. Швидке оформлення, доставка по Україні.',
          images: [
            {
              url: 'https://gumatransservice.com/images/checkout-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Оформлення замовлення - ГУМАТРАНССЕРВІС',
            },
          ],
          site_name: 'ГУМАТРАНССЕРВІС',
        }}
        twitter={{
          handle: '@yourhandle',
          site: '@yourhandle',
          cardType: 'summary_large_image',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Оформлення замовлення</h1>
        {cart.length === 0 ? (
          <div className="empty-cart">
            <p className="text-lg text-gray-600">Ваш кошик порожній.</p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-semibold mb-4">Ваше замовлення</h2>
            <ul className="mb-6">
              {cart.map((item: CartItem, index: number) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>
                    {item.tire.brand} {item.tire.model} ({item.tire.size}) x{item.quantity}
                  </span>
                  <span>
                    {item.tire.price
                      ? `${(item.tire.price * item.quantity).toLocaleString()} грн`
                      : 'Ціна за запитом'}
                  </span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold mb-6">
              Загальна сума: {hasPriceOnRequest ? `${totalPrice.toLocaleString()} грн (деякі товари за запитом)` : `${totalPrice.toLocaleString()} грн`}
            </p>
            <h2 className="text-2xl font-semibold mb-4">Дані для замовлення</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ім'я"
                className="modern-input"
                required
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Телефон"
                className="modern-input"
                required
              />
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="bookTireChange"
                  checked={formData.bookTireChange}
                  onChange={handleInputChange}
                  className="h-5 w-5"
                />
                <span className="text-gray-600">Записатись на перевзування</span>
              </label>
              {formData.bookTireChange && (
                <p className="text-sm text-gray-500">
                  Ми зателефонуємо вам і оберемо для вас найкращий варіант.
                </p>
              )}
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name="postalDelivery"
                  checked={formData.postalDelivery}
                  onChange={handleInputChange}
                  className="h-5 w-5"
                />
                <span className="text-gray-600">Доставка Новою Поштою</span>
              </label>
              {formData.postalDelivery && (
                <div className="flex flex-col gap-4">
                  <input
                    type="text"
                    name="postalCity"
                    value={formData.postalCity}
                    onChange={handleInputChange}
                    placeholder="Місто"
                    className="modern-input"
                    required
                  />
                  <input
                    type="text"
                    name="postalBranch"
                    value={formData.postalBranch}
                    onChange={handleInputChange}
                    placeholder="Номер відділення Нової Пошти"
                    className="modern-input"
                    required
                  />
                  <input
                    type="text"
                    name="postalAddress"
                    value={formData.postalAddress}
                    onChange={handleInputChange}
                    placeholder="Адреса для кур’єрської доставки (необов’язково)"
                    className="modern-input"
                  />
                </div>
              )}
              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                Підтвердити замовлення
              </button>
            </form>
          </>
        )}
      </div>
    </>
  );
}