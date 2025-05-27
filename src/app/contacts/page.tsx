'use client';

import { useState } from 'react';
import { Formik, Form, Field } from 'formik';
import Link from 'next/link';

export default function Contacts() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-center mb-8">Контакти</h2>

      {/* Контактна інформація */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Наші контакти</h3>
          <p className="text-gray-600 mb-2"><strong>Адреса:</strong> вул. Об'їзна, м. Бориспіль, Київська область, 08320</p>
          <p className="text-gray-600 mb-2"><strong>Телефон:</strong> +380 (67) 239-96-89</p>
          <p className="text-gray-600 mb-2"><strong>Email:</strong> info@humatransservice.com.ua</p>
          <p className="text-gray-600"><strong>Графік роботи:</strong></p>
          <ul className="text-gray-600 list-disc list-inside">
            <li>Понеділок: 08:00–20:00</li>
            <li>Вівторок: 08:00–20:00</li>
            <li>Середа: 08:00–20:00</li>
            <li>Четвер: 08:00–20:00</li>
            <li>П’ятниця: 08:00–20:00</li>
            <li>Субота: 08:00–20:00</li>
            <li>Неділя: 08:00–20:00</li>
          </ul>
        </div>
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-2xl font-semibold mb-4">Ми на карті</h3>
          <div className="w-full h-64">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.876!2d30.8545587!3d50.416733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTAuNDE2NzMzLDMwLjg1Njc0Nw!5e0!3m2!1sen!2sua!4v1697051234567"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Карта ТОВ ГУМАТРАНССЕРВІС"
            ></iframe>
          </div>
        </div>
      </div>

      {/* Форма зворотного зв’язку */}
      <h3 className="text-2xl font-bold mb-6 text-center">Зв’яжіться з нами</h3>
      <div className="bg-gray-100 p-8 rounded-lg max-w-lg mx-auto mb-12">
        {submitted ? (
          <div className="text-center">
            <p className="text-green-600 text-lg mb-4">Ваше повідомлення надіслано! Ми відповімо найближчим часом.</p>
            <button
              onClick={() => setSubmitted(false)}
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
            >
              Надіслати ще
            </button>
          </div>
        ) : (
          <Formik
            initialValues={{ name: '', email: '', message: '' }}
            onSubmit={(values, { resetForm }) => {
              console.log(values); // Для тестування
              setSubmitted(true);
              resetForm();
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
                name="email"
                type="email"
                placeholder="Ваш email"
                className="p-3 border rounded"
                required
              />
              <Field
                as="textarea"
                name="message"
                placeholder="Ваше повідомлення"
                className="p-3 border rounded h-32"
                required
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
              >
                Надіслати
              </button>
            </Form>
          </Formik>
        )}
      </div>

      {/* Швидкі посилання */}
      <div className="text-center">
        <p className="text-lg mb-4">Дізнайтесь більше про наші послуги або перегляньте каталог!</p>
        <div className="flex justify-center gap-4">
          <Link href="/catalog" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Каталог шин
          </Link>
          <Link href="/services" className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white">
            Послуги
          </Link>
        </div>
      </div>
    </div>
  );
}