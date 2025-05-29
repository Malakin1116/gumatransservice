'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function Catalog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>TIR Шини та Диски в Борисполі, Гурівщині | ГУМАТРАНССЕРВІС</title>
        <meta
          name="description"
          content="Широкий вибір вантажних шин і дисків для TIR у Борисполі (Бориспільська окружна) та Гурівщині. Купуйте якісні шини за вигідними цінами!"
        />
        <meta
          name="keywords"
          content="вантажні шини, диски для вантажівок, TIR шиномонтаж, купити шини Бориспіль, купити шини Гурівщина, каталог шин, каталог дисків, ГУМАТРАНССЕРВІС, Київська область"
        />
      </Head>

      {/* Банер */}
      <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-2xl py-12 mb-12 overflow-hidden animate-fade-in">
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" fill="none" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="40" stroke="white" strokeWidth="0.5" strokeDasharray="10 10" />
          </svg>
        </div>
        <div className="relative max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
            Знайдіть ідеальні шини та диски для вашої вантажівки! 
          </h2>
          <p className="text-lg mb-6">
            Якісні шини та диски для TIR у Борисполі та Гурівщині за найкращими цінами.
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog/tires"
              className="bg-white text-blue-900 px-6 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-105 animate-bounce-in"
            >
              До шин
            </Link>
            <Link
              href="/catalog/disks"
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-transform transform hover:scale-105 animate-bounce-in delay-100"
            >
              До дисків
            </Link>
          </div>
        </div>
      </section>

      {/* Каталог */}
      <h1 className="text-3xl font-bold mb-8 text-blue-900 text-center animate-fade-in delay-200">
        Оберіть свій каталог
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link
          href="/catalog/tires"
          className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300 animate-slide-in"
        >
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Каталог шин</h3>
            <p className="text-gray-600">Широкий вибір вантажних шин для TIR</p>
          </div>
        </Link>
        <Link
          href="/catalog/disks"
          className="bg-white rounded-xl shadow-lg p-6 flex items-center gap-4 transform hover:scale-105 transition-transform duration-300 animate-slide-in delay-100"
        >
          <svg className="w-12 h-12 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth={2} fill="none" />
          </svg>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">Каталог дисків</h3>
            <p className="text-gray-600">Надійні диски для вантажівок</p>
          </div>
        </Link>
      </div>
    </div>
  );
}