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

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const total = cart.reduce((sum: number, item: Tire) => sum + (item.price || 0), 0);
    setTotalPrice(total);
  }, [cart]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.address) {
      alert('Будь ласка, заповніть усі поля.');
      return;
    }
    alert(`Дякуємо за замовлення, ${formData.name}! Ми зв'яжемося з вами за номером ${formData.phone}.`);
    clearCart();
    setFormData({ name: '', phone: '', address: '' });
  };

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
              {cart.map((item: Tire, index: number) => (
                <li key={index} className="flex justify-between py-2 border-b">
                  <span>{item.brand} {item.model} ({item.size})</span>
                  <span>{item.price ? `${item.price.toLocaleString()} грн` : 'Ціна за запитом'}</span>
                </li>
              ))}
            </ul>
            <p className="text-lg font-semibold mb-6">Загальна сума: {totalPrice.toLocaleString()} грн</p>
            <h2 className="text-2xl font-semibold mb-4">Дані для доставки</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Ім'я"
                className="modern-input"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Телефон"
                className="modern-input"
              />
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Адреса доставки"
                className="modern-input"
              />
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