'use client';

import { useState, useEffect } from 'react';
import { NextSeo } from 'next-seo';
import { useCart } from '../context/CartContext';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';

export const dynamic = 'force-dynamic';

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

interface FormValues {
  name: string;
  phone: string;
  bookTireChange: boolean;
  postalDelivery: boolean;
  postalCity: string;
  postalBranch: string;
  postalAddress: string;
}

export default function Checkout() {
  const [isMounted, setIsMounted] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [hasPriceOnRequest, setHasPriceOnRequest] = useState(false);
  const { cart, clearCart } = useCart();

  useEffect(() => {
    try {
      console.log('Checkout useEffect: Mounting');
      setIsMounted(true);
    } catch (error) {
      console.error('Checkout useEffect error:', error);
    }
  }, []);

  useEffect(() => {
    try {
      console.log('Checkout useEffect: Cart update', cart);
      if (cart && Array.isArray(cart)) {
        const hasPriceNull = cart.some((item: CartItem) => item.tire.price === null);
        setHasPriceOnRequest(hasPriceNull);

        const total = cart.reduce(
          (sum: number, item: CartItem) => sum + (item.tire.price || 0) * item.quantity,
          0
        );
        setTotalPrice(total);
      }
    } catch (error) {
      console.error('Checkout cart update error:', error);
    }
  }, [cart]);

  if (!isMounted) {
    console.log('Checkout: Rendering loading state');
    return <div>Завантаження...</div>;
  }

  console.log('Checkout: Rendering with cart:', cart);

  const validationSchema = Yup.object({
    name: Yup.string().required("Ім'я обов'язкове"),
    phone: Yup.string()
      .matches(/^\+380[0-9]{9}$/, 'Номер телефону має бути у форматі +380XXXXXXXXX')
      .required("Номер телефону обов'язковий"),
    postalCity: Yup.string().when('postalDelivery', {
      is: true,
      then: (schema) => schema.required('Місто обов’язкове'),
      otherwise: (schema) => schema.optional(),
    }),
    postalBranch: Yup.string().when('postalDelivery', {
      is: true,
      then: (schema) => schema.required('Номер відділення обов’язковий'),
      otherwise: (schema) => schema.optional(),
    }),
    postalAddress: Yup.string().optional(),
  });

  const sendOrderToTelegram = async (values: FormValues) => {
    try {
      const botToken = process.env.TELEGRAM_BOT_TOKEN;
      const chatId = process.env.TELEGRAM_CHAT_ID;

      if (!botToken || !chatId) {
        throw new Error('Налаштування Telegram некоректні');
      }

      const message = `
Нове замовлення:
Ім'я: ${values.name}
Телефон: ${values.phone}
${values.bookTireChange ? 'Запис на перевзування: Так (ми зателефонуємо вам і оберемо найкращий варіант)' : 'Запис на перевзування: Ні'}
${values.postalDelivery ? `Доставка поштою: Так
Місто: ${values.postalCity}
Номер відділення Нової Пошти: ${values.postalBranch}
Адреса для кур’єрської доставки: ${values.postalAddress || 'Не вказано'}` : 'Доставка поштою: Ні'}
Товари:
${cart.map((item: CartItem) => `- ${item.tire.brand} ${item.tire.model} (${item.tire.size}) x${item.quantity} - ${item.tire.price ? `${(item.tire.price * item.quantity).toLocaleString()} грн` : 'Ціна за запитом'}`).join('\n')}
Загальна сума: ${hasPriceOnRequest ? `${totalPrice.toLocaleString()} грн (деякі товари за запитом)` : `${totalPrice.toLocaleString()} грн`}
Час замовлення: ${new Date().toLocaleString()}
      `;

      const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: chatId, text: message }),
      });

      const data = await response.json();
      if (!data.ok) {
        throw new Error(`Помилка відправки в Telegram: ${data.description}`);
      }
    } catch (error) {
      console.error('Checkout sendOrderToTelegram error:', error);
      throw error;
    }
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
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Оформлення замовлення</h1>
        {cart && Array.isArray(cart) && cart.length === 0 ? (
          <div className="empty-cart">
            <p className="text-lg text-gray-600">Ваш кошик порожній.</p>
          </div>
        ) : (
          <Formik
            initialValues={{
              name: '',
              phone: '',
              bookTireChange: true,
              postalDelivery: false,
              postalCity: '',
              postalBranch: '',
              postalAddress: '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values: FormValues, { resetForm }) => {
              try {
                console.log('Checkout: Submitting form', values);
                if (!cart || cart.length === 0) {
                  alert('Ваш кошик порожній.');
                  return;
                }
                await sendOrderToTelegram(values);
                alert(`Дякуємо за замовлення, ${values.name}! Ми зв’яжемося з вами за номером ${values.phone}.`);
                clearCart();
                resetForm();
              } catch (error) {
                console.error('Checkout form submission error:', error);
                alert('Замовлення оформлено, але не вдалося відправити в Telegram. Ми зв’яжемося з вами.');
              }
            }}
          >
            {({ setFieldValue, values }) => (
              <Form className="flex flex-col gap-4 max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Ваше замовлення</h2>
                <ul className="mb-6">
                  {cart && Array.isArray(cart) && cart.map((item: CartItem, index: number) => (
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
                <div>
                  <Field
                    name="name"
                    placeholder="Введіть ваше ім’я"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white w-full placeholder-gray-400 modern-input"
                  />
                  <ErrorMessage name="name" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <div>
                  <Field
                    name="phone"
                    type="tel"
                    placeholder="+380"
                    className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white w-full placeholder-gray-400 modern-input"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      try {
                        let value = e.target.value;
                        if (!value.startsWith('+380')) {
                          value = '+380' + value.replace(/^\+380/, '');
                        }
                        setFieldValue('phone', value);
                      } catch (error) {
                        console.error('Checkout phone input error:', error);
                      }
                    }}
                  />
                  <ErrorMessage name="phone" component="p" className="text-red-500 text-sm mt-1" />
                </div>
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="bookTireChange"
                    className="h-5 w-5"
                  />
                  <span className="text-gray-600">Записатись на перевзування</span>
                </label>
                {values.bookTireChange && (
                  <p className="text-sm text-gray-500">
                    Ми зателефонуємо вам і оберемо для вас найкращий варіант.
                  </p>
                )}
                <label className="flex items-center gap-2">
                  <Field
                    type="checkbox"
                    name="postalDelivery"
                    className="h-5 w-5"
                  />
                  <span className="text-gray-600">Доставка Новою Поштою</span>
                </label>
                {values.postalDelivery && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <Field
                        name="postalCity"
                        placeholder="Місто"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white w-full placeholder-gray-400 modern-input"
                      />
                      <ErrorMessage name="postalCity" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <Field
                        name="postalBranch"
                        placeholder="Номер відділення Нової Пошти"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white w-full placeholder-gray-400 modern-input"
                      />
                      <ErrorMessage name="postalBranch" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                    <div>
                      <Field
                        name="postalAddress"
                        placeholder="Адреса для кур’єрської доставки (необов’язково)"
                        className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white w-full placeholder-gray-400 modern-input"
                      />
                      <ErrorMessage name="postalAddress" component="p" className="text-red-500 text-sm mt-1" />
                    </div>
                  </div>
                )}
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                >
                  Підтвердити замовлення
                </button>
              </Form>
            )}
          </Formik>
        )}
      </div>
    </>
  );
}