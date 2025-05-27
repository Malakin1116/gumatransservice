'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';

export default function Services() {
  const [submitted, setSubmitted] = useState(false);

  const services = [
    {
      title: 'Шиномонтаж',
      description: 'Професійна заміна шин для вантажних авто з балансуванням.',
      price: 'від 500 грн/колесо',
      icon: '🔧',
    },
    {
      title: 'Балансування коліс',
      description: 'Точне балансування для зменшення вібрації та зносу шин.',
      price: 'від 300 грн/колесо',
      icon: '⚖️',
    },
    {
      title: 'Ремонт шин',
      description: 'Усунення проколів, порізів та інших пошкоджень.',
      price: 'від 200 грн',
      icon: '🩹',
    },
  ];

  const priceTable = [
    { service: 'Шиномонтаж (R17.5)', price: '500 грн/колесо' },
    { service: 'Шиномонтаж (R22.5)', price: '600 грн/колесо' },
    { service: 'Балансування (R17.5)', price: '300 грн/колесо' },
    { service: 'Балансування (R22.5)', price: '350 грн/колесо' },
    { service: 'Ремонт проколу', price: '200 грн' },
    { service: 'Ремонт порізу', price: '400 грн' },
  ];

  const sendBookingToTelegram = async (values: { name: string; phone: string; date: string; service: string }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error('Помилка: TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не визначені.');
      throw new Error('Налаштування Telegram некоректні');
    }

    const message = `
Новий запит на шиномонтаж:
Ім'я: ${values.name}
Телефон: ${values.phone}
Бажана дата: ${values.date || 'Не вказано'}
Послуга: ${values.service}
Час запиту: ${new Date().toLocaleString()}
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
      console.log('Запит на шиномонтаж успішно відправлено в Telegram:', data);
    } catch (error) {
      console.error('Помилка відправки в Telegram:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Послуги шиномонтажу</h2>

      {/* Картки послуг */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 hover:shadow-xl"
          >
            <div className="text-4xl mb-4">{service.icon}</div>
            <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-blue-600 font-bold">{service.price}</p>
          </div>
        ))}
      </div>

      {/* Таблиця цін */}
      <h3 className="text-2xl font-bold mb-6">Прайс-лист</h3>
      <div className="overflow-x-auto mb-12">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 text-left">Послуга</th>
              <th className="p-4 text-left">Ціна</th>
            </tr>
          </thead>
          <tbody>
            {priceTable.map((item, index) => (
              <tr key={index} className="border-b hover:bg-blue-50">
                <td className="p-4">{item.service}</td>
                <td className="p-4">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Форма запису */}
      <h3 className="text-2xl font-bold mb-6 text-center">Запис на шиномонтаж</h3>
      <div className="bg-blue-50 p-8 rounded-lg max-w-lg mx-auto">
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 text-lg mb-4">Дякуємо за ваш запит! Ми зв’яжемося з вами найближчим часом.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Подати новий запит
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ name: '', phone: '', date: '', service: '' }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await sendBookingToTelegram(values);
                setSubmitted(true);
                resetForm();
              } catch (error) {
                alert('Запит оформлено, але не вдалося відправити в Telegram. Ми зв’яжемося з вами.');
              }
            }}
          >
            <Form className="flex flex-col gap-4">
              <Field
                name="name"
                placeholder="Ваше ім’я"
                className="p-3 border rounded"
                required
              />
              <Field
                name="phone"
                type="tel"
                placeholder="Номер телефону"
                className="p-3 border rounded"
                required
              />
              <Field
                name="date"
                type="date"
                className="p-3 border rounded"
              />
              <Field as="select" name="service" className="p-3 border rounded" required>
                <option value="">Оберіть послугу</option>
                <option value="Шиномонтаж">Шиномонтаж</option>
                <option value="Балансування">Балансування</option>
                <option value="Ремонт шин">Ремонт шин</option>
              </Field>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Записатися
              </button>
            </Form>
          </Formik>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-12">
        <Link href="/catalog" className="bg-blue-600 text-white px-8 py-4 rounded-full hover:bg-blue-700 text-lg font-semibold">
          Переглянути каталог шин
        </Link>
      </div>
    </div>
  );
}