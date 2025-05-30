'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Додано

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);
  const boryspilMapLink = "https://maps.app.goo.gl/pSPjEEWP8pi4Y4jZA";
  const hurivshchynaMapLink = "https://maps.app.goo.gl/6f1imretRviTXtJF7";

  const sendMessageToTelegram = async (values: { name: string; email: string; message: string }) => {
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    console.log('Bot Token:', botToken ? 'Defined' : 'Undefined');
    console.log('Chat ID:', chatId ? 'Defined' : 'Undefined');

    if (!botToken || !chatId) {
      console.error('Помилка: TELEGRAM_BOT_TOKEN або TELEGRAM_CHAT_ID не визначені.');
      throw new Error('Налаштування Telegram некоректні');
    }

    const message = `
Нове повідомлення з форми зворотного зв’язку:
Ім'я: ${values.name}
Email: ${values.email}
Повідомлення: ${values.message}
Час надсилання: ${new Date().toLocaleString()}
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
      console.log('Відповідь Telegram API:', data);
      if (!data.ok) {
        console.error('Помилка Telegram API:', data);
        throw new Error(`Помилка відправки в Telegram: ${data.description}`);
      }
      console.log('Повідомлення успішно відправлено в Telegram:', data);
    } catch (error) {
      console.error('Помилка відправки в Telegram:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-4xl font-extrabold text-center mb-12 text-blue-900 animate-fade-in flex items-center justify-center">
        <svg className="w-8 h-8 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7h-4V4a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h1m13 0h-4m4 0a2 2 0 002-2V9a2 2 0 00-2-2zm-4 7a2 2 0 110-4 2 2 0 010 4zm-8 0a2 2 0 110-4 2 2 0 010 4z" />
        </svg>
        Зв’яжіться з нами – ми завжди на зв’язку!
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 animate-slide-in">
          <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center">
            <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Наші контакти
          </h3>
          <p className="text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span><strong>Адреса (Бориспіль):</strong> вул. Об'їзна, м. Бориспіль, Київська область, 08320</span>
          </p>
          <p className="text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span><strong>Адреса (Гурівщина):</strong> вул. Київська, 100/1, Гурівщина, Київська область, 08124</span>
          </p>
          <p className="text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            <span><strong>Телефон:</strong> <a href="tel:+380672399689" className="hover:underline">+380 (67) 239-96-89</a></span>
          </p>
          <p className="text-gray-700 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            <span><strong>Email:</strong> <a href="mailto:info@humatransservice.com.ua" className="hover:underline">info@humatransservice.com.ua</a></span>
          </p>
          <p className="text-gray-700 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <strong>Графік роботи:</strong>
          </p>
          <ul className="text-gray-700 list-disc list-inside">
            <li>Пн–Нд: 08:00–20:00</li>
          </ul>
        </div>
        <div className="grid grid-cols-1 gap-8">
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 animate-slide-in delay-200">
            <Link href={boryspilMapLink} target="_blank" rel="noopener noreferrer">
              <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center hover:underline">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Знайдіть нас на Бориспільській окружній
              </h3>
            </Link>
            <a href={boryspilMapLink} target="_blank" rel="noopener noreferrer" className="block w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d405.97827153616873!2d30.856110527763498!3d50.4166572881392!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4dd26019bab89%3A0xb6e2e0bb6d895eb2!2z0JPQo9Cc0JDQotCg0JDQndCh0KHQldCg0JLQmNCh!5e0!3m2!1suk!2sua!4v1748526866807!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Карта ТОВ ГУМАТРАНССЕРВІС у Борисполі"
              ></iframe>
            </a>
          </div>
          <div className="bg-white rounded-xl shadow-xl p-8 transform hover:scale-105 transition-transform duration-300 animate-slide-in delay-300">
            <Link href={hurivshchynaMapLink} target="_blank" rel="noopener noreferrer">
              <h3 className="text-2xl font-bold mb-6 text-blue-600 flex items-center hover:underline">
                <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Знайдіть нас у Гурівщині
              </h3>
            </Link>
            <a href={hurivshchynaMapLink} target="_blank" rel="noopener noreferrer" className="block w-full h-64 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2541.347164625593!2d30.083679377020157!3d50.43463388850188!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4c5cc9c0cadd5%3A0xc5ccc417adc14bc3!2z0KLQntCSINCT0YPQvNCw0YLRgNCw0L3RgdGB0LXRgNCy0ZbRgQ!5e0!3m2!1suk!2sua!4v1748529057248!5m2!1suk!2sua"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Карта ТОВ ГУМАТРАНССЕРВІС у Гурівщині"
              ></iframe>
            </a>
          </div>
        </div>
      </div>

      <h3 className="text-3xl font-bold mb-8 text-center text-blue-900 animate-fade-in">
        Напишіть нам – ми відповімо миттєво! 📬
      </h3>
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-8 rounded-2xl max-w-lg mx-auto mb-12 shadow-lg animate-bounce-in">
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 text-xl font-semibold mb-4 animate-pulse">
              Ура! Ваше повідомлення надіслано! 🎉 Ми зв’яжемося з вами незабаром.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
            >
              Надіслати ще
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            onSubmit={async (values, { resetForm }) => {
              try {
                await sendMessageToTelegram(values);
                setSubmitted(true);
                resetForm();
              } catch (error) {
                alert('Повідомлення не вдалося відправити. Спробуйте ще раз або зв’яжіться з нами за телефоном.');
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
                name="email"
                type="email"
                placeholder="Ваш email"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
                required
              />
              <Field
                as="textarea"
                name="message"
                placeholder="Ваше повідомлення"
                className="p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white h-32"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
              >
                Надіслати повідомлення
              </button>
            </Form>
          </Formik>
        )}
      </div>

      <div className="text-center animate-fade-in delay-300">
        <p className="text-xl font-semibold mb-6 text-gray-800">
          Готові знайти ідеальні шини чи записатися на шиномонтаж? 🚛
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/catalog"
            className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-110 hover:shadow-xl"
          >
            Переглянути каталог
          </Link>
          <Link
            href="/services"
            className="bg-transparent border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-transform transform hover:scale-110 hover:shadow-xl"
          >
            Наші послуги
          </Link>
        </div>
      </div>
    </div>
  );
}