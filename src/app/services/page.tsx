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
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      ),
    },
    {
      title: 'Балансування коліс',
      description: 'Точне балансування для зменшення вібрації та зносу шин.',
      price: 'від 300 грн/колесо',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={2} fill="none" />
        </svg>
      ),
    },
    {
      title: 'Ремонт шин',
      description: 'Усунення проколів, порізів та інших пошкоджень.',
      price: 'від 200 грн',
      icon: (
        <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
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
      {/* Банер */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl py-12 mb-12 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 flex items-center justify-center">
            <svg className="w-8 h-8 mr-2 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Якісний шиномонтаж для ваших вантажівок!
          </h2>
          <p className="text-lg mb-6">
            Професійні послуги у Борисполі та Гурівщині – від заміни шин до ремонту!
          </p>
          <Link
            href="/contacts"
            className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105 animate-bounce-in"
          >
            Зв’яжіться з нами
          </Link>
        </div>
      </section>

      {/* Картки послуг */}
      <h3 className="text-3xl font-bold text-center mb-8 text-blue-900 animate-fade-in">
        Наші послуги
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {services.map((service, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-xl p-6 transform hover:scale-105 transition-transform duration-300 animate-slide-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="mb-4">{service.icon}</div>
            <h4 className="text-xl font-semibold mb-2 text-gray-900">{service.title}</h4>
            <p className="text-gray-600 mb-4">{service.description}</p>
            <p className="text-blue-600 font-bold">{service.price}</p>
          </div>
        ))}
      </div>

      {/* Таблиця цін */}
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-900 animate-fade-in">
        Прайс-лист
      </h3>
      <div className="overflow-x-auto mb-12 animate-fade-in delay-200">
        <table className="w-full bg-white shadow-xl rounded-lg">
          <thead>
            <tr className="bg-gradient-to-r from-blue-600 to-blue-800 text-white">
              <th className="p-4 text-left text-sm font-semibold">Послуга</th>
              <th className="p-4 text-left text-sm font-semibold">Ціна</th>
            </tr>
          </thead>
          <tbody>
            {priceTable.map((item, index) => (
              <tr key={index} className="border-b hover:bg-blue-50 transition-colors">
                <td className="p-4 text-gray-800">{item.service}</td>
                <td className="p-4 text-blue-600 font-semibold">{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Форма запису */}
      <h3 className="text-3xl font-bold mb-8 text-center text-blue-900 animate-fade-in">
        Запис на шиномонтаж
      </h3>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl max-w-lg mx-auto mb-12 shadow-lg animate-bounce-in">
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 text-xl font-semibold mb-4 animate-pulse">
              Ура! Ваш запит надіслано! 🎉 Ми зв’яжемося з вами незабаром.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
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
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                required
              />
              <Field
                name="phone"
                type="tel"
                placeholder="Номер телефону"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                required
              />
              <Field
                name="date"
                type="date"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
              <Field as="select" name="service" className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white" required>
                <option value="">Оберіть послугу</option>
                <option value="Шиномонтаж">Шиномонтаж</option>
                <option value="Балансування">Балансування</option>
                <option value="Ремонт шин">Ремонт шин</option>
              </Field>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
              >
                Записатися
              </button>
            </Form>
          </Formik>
        )}
      </div>

      {/* CTA */}
      <div className="text-center mt-12 animate-fade-in delay-300">
        <Link
          href="/catalog"
          className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-4 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-110 hover:shadow-xl"
        >
          Переглянути каталог шин
        </Link>
      </div>
    </div>
  );
}