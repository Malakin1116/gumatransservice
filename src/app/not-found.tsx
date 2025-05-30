'use client';

import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <Head>
        <title>404 - Сторінку не знайдено</title>
        <meta name="description" content="Сторінка не знайдена. Зв’яжіться з нами через сторінку контактів." />
      </Head>
      <div className="py-12 bg-gray-50 rounded-lg shadow-md">
        <svg
          className="w-24 h-24 mx-auto mb-4 text-gray-400 animate-bounce-slow"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <h1 className="text-3xl font-bold mb-4 text-gray-900">404 - Сторінку не знайдено</h1>
        <p className="text-gray-600 text-lg mb-4">Вибачте, сторінку, яку ви шукаєте, не існує або вона ще в розробці.</p>
        <p className="text-gray-500 text-sm mb-6">
          Зв’яжіться з нами через сторінку контактів для отримання додаткової інформації.
        </p>
        <Link
          href="/contacts"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform transform duration-200 hover:scale-105"
        >
          Перейти до контактів
        </Link>
      </div>
    </div>
  );
}