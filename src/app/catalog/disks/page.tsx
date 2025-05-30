'use client';

import Link from 'next/link';
import Head from 'next/head';

function DiskPlaceholderSVG({ className = '' }) {
  return (
    <svg
      className={className}
      width="96"
      height="96"
      viewBox="0 0 96 96"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="48" cy="48" r="29" fill="#4B5563" stroke="#1F2937" strokeWidth="2" />
      <circle cx="48" cy="48" r="14" fill="#6B7280" />
      <circle cx="38" cy="29" r="3" fill="#D1D5DB" />
      <circle cx="58" cy="29" r="3" fill="#D1D5DB" />
      <circle cx="29" cy="48" r="3" fill="#D1D5DB" />
      <circle cx="67" cy="48" r="3" fill="#D1D5DB" />
      <circle cx="38" cy="67" r="3" fill="#D1D5DB" />
      <circle cx="58" cy="67" r="3" fill="#D1D5DB" />
    </svg>
  );
}

export default function DisksCatalog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог дисків для вантажівок</title>
        <meta name="description" content="Каталог дисків у розробці. Зв’яжіться з нами для деталей." />
      </Head>
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Каталог дисків</h1>
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <DiskPlaceholderSVG className="w-24 h-24 mx-auto mb-4 text-gray-400" />
        <p className="text-gray-600 text-lg mb-4">Каталог дисків у розробці</p>
        <p className="text-gray-500 text-sm mb-6">
          Ви можете отримати каталог, зв’язавшись із нами через сторінку контактів.
        </p>
        <Link
          href="/contacts"
          className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-transform transform hover:scale-105"
        >
          Перейти до контактів
        </Link>
      </div>
    </div>
  );
}