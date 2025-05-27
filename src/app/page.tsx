'use client';

import { useState } from 'react';
import Link from 'next/link';
import tiresData from '../../data/tires.json';

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Вибір популярних шин (перші 3 з tires.json)
  const popularTires = tiresData.slice(0, 3);

  // Слайдер
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % popularTires.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + popularTires.length) % popularTires.length);

  const reviews = [
    { name: 'Олег К.', text: 'Швидкий шиномонтаж і якісні шини за доступною ціною!', rating: 5 },
    { name: 'Марія П.', text: 'Зберігала шини на зиму, все в ідеальному стані.', rating: 4 },
    { name: 'Іван С.', text: 'Професійна команда, рекомендую!', rating: 5 },
  ];

  return (
    <div className="bg-gray-50">
      {/* Герой-секція */}
      <section className="relative bg-gradient-to-r from-blue-900 to-blue-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4 animate-fade-in">ТОВ "ГУМАТРАНССЕРВІС"</h1>
          <p className="text-xl mb-8">Ваш надійний партнер у світі шин та шиномонтажу для вантажних авто!</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105"
            >
              Переглянути каталог
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-transform transform hover:scale-105"
            >
              Наші послуги
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      {/* Слайдер популярних шин */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8">Популярні шини</h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {popularTires.map((tire, index) => (
                <div key={index} className="min-w-full flex justify-center">
                  <div className="bg-white rounded-lg shadow-lg p-6 max-w-md text-center">
                    <h3 className="text-xl font-semibold mb-2">{tire.brand} {tire.model}</h3>
                    <p className="text-gray-600 mb-2">Розмір: {tire.size}</p>
                    <p className="text-gray-600 mb-2">Тип: {tire.type || 'Шина'}</p>
                    <p className="text-blue-600 font-bold mb-4">
                      {tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}
                    </p>
                    <Link
                      href="/catalog"
                      className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
                    >
                      Детальніше
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            ←
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
          >
            →
          </button>
        </div>
      </section>

      {/* Секція відгуків */}
      <section className="bg-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">Що кажуть наші клієнти</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6">
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
          <h3 className="text-2xl font-bold mb-4">Готові до якісного шиномонтажу?</h3>
          <p className="text-lg mb-6">Зв’яжіться з нами або перегляньте наш каталог!</p>
          <Link
            href="/services"
            className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105"
          >
            Записатися на шиномонтаж
          </Link>
        </div>
      </section>
    </div>
  );
}