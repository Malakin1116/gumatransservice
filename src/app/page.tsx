'use client';

import Link from 'next/link';
import tiresData from '../../data/tires.json';
import TirePlaceholderSVG from '../app/components/TirePlaceholderSVG';

export default function Home() {
  const popularTires = tiresData.slice(0, 3); // Показуємо 3 шини

  return (
    <div className="bg-gray-50">
      {/* Герой-секція з SVG */}
      <section className="relative py-24 text-white overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(2, 132, 199, 0.85)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.65)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#heroGradient)"
            className="animate-pulse opacity-30"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="10 10"
            className="opacity-10"
          />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            ТОВ "ГУМАТРАНССЕРВІС"
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-200">
            Потужні шини та професійний шиномонтаж для ваших вантажівок!
          </p>
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
              <TirePlaceholderSVG className="w-24 h-24 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">
                {tire.brand} {tire.model}
              </h3>
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