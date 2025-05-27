'use client';

import { useState } from 'react';
import Link from 'next/link';
import tiresData from '../../data/tires.json';

export default function Home() {
  const popularTires = tiresData.slice(0, 3); // Показуємо 3 шини

  const reviews = [
    { name: 'Олег К.', text: 'Швидкий шиномонтаж і якісні шини за доступною ціною!', rating: 5 },
    { name: 'Марія П.', text: 'Зберігала шини на зиму, все в ідеальному стані.', rating: 4 },
    { name: 'Іван С.', text: 'Професійна команда, рекомендую!', rating: 5 },
  ];

  return (
    <div className="bg-gray-50">
      {/* Герой-секція */}
      <section
        className="relative bg-cover bg-center py-24 text-white overflow-hidden"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(2, 132, 199, 0.85), rgba(59, 130, 246, 0.65)), url('https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1350&q=80')`,
        }}
      >
        <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-blue-900 via-blue-600 to-blue-400 opacity-30"></div>
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg className="w-1/2 h-1/2" viewBox="0 0 100 100" fill="none" stroke="white" strokeWidth="0.5">
            <path d="M50 10 a 40 40 0 0 1 0 80 a 40 40 0 0 1 0 -80" strokeDasharray="10 10" />
          </svg>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">ТОВ "ГУМАТРАНССЕРВІС"</h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-200">Потужні шини та професійний шиномонтаж для ваших вантажівок!</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-110 hover:shadow-2xl animate-bounce-in"
            >
              Каталог шин
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-transform transform hover:scale-110 hover:shadow-2xl animate-bounce-in delay-100"
            >
              Послуги
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Секція популярних шин */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Наші бестселери</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularTires.map((tire, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform duration-500 hover:scale-105 animate-slide-in"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="text-4xl mb-4">🚜</div>
              <h3 className="text-xl font-semibold mb-2">{tire.brand} {tire.model}</h3>
              <p className="text-gray-600 mb-2">Розмір: {tire.size}</p>
              <p className="text-gray-600 mb-2">Тип: {tire.type || 'Шина'}</p>
              <p className="text-blue-600 font-bold mb-4">
                {tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}
              </p>
              <Link
                href="/catalog"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Детальніше
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Секція відгуків */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Відгуки наших клієнтів</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 transform transition-transform duration-500 hover:scale-105 animate-slide-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <p className="text-gray-600 mb-4">"{review.text}"</p>
                <div className="flex items-center">
                  <span className="text-yellow-400">{'★'.repeat(review.rating)}</span>
                  <span className="ml-2 font-semibold">{review.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA-секція */}
      <section className="bg-blue-900 text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Потрібні шини чи шиномонтаж?</h3>
          <p className="text-lg mb-6">Перегляньте наш каталог або запишіться прямо зараз!</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-110 hover:shadow-2xl"
            >
              Каталог
            </Link>
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition-transform transform hover:scale-110 hover:shadow-2xl"
            >
              Запис на шиномонтаж
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}