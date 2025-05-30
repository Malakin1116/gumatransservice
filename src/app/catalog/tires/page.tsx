'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import tiresDataRaw from '../../../../data/tires.json';

export const dynamic = 'force-dynamic';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
}

const tiresData: Tire[] = tiresDataRaw as Tire[];

export default function TiresCatalog() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      console.log('TiresCatalog: Mounting');
      setIsMounted(true);
    } catch (error) {
      console.error('TiresCatalog mount error:', error);
    }
  }, []);

  if (!isMounted) {
    console.log('TiresCatalog: Rendering loading');
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог шин</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  console.log('TiresCatalog: Rendering tires', tiresData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог шин</h1>
      <div className="mb-6">
        <Link href="/catalog/disks" className="text-blue-600 hover:underline text-sm font-medium">
          Перейти до каталогу дисків
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tiresData.length === 0 ? (
          <p className="text-gray-600">Немає шин для відображення.</p>
        ) : (
          tiresData.map((tire, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-base font-semibold mb-2 text-gray-900">
                {tire.brand} {tire.model}
              </h3>
              <p className="text-gray-600 text-sm mb-1">Розмір: {tire.size}</p>
              <p className="text-gray-600 text-sm mb-1">Вісь: {tire.axle}</p>
              <p className="text-gray-600 text-sm mb-1">Країна: {tire.country}</p>
              <p className="text-blue-600 font-bold text-sm mb-4">
                {tire.price ? `${tire.price.toLocaleString()} грн` : 'Ціна за запитом'}
              </p>
              {tire.price && (
                <button
                  onClick={() => {
                    try {
                      console.log('TiresCatalog: Adding to cart', tire);
                      addToCart(tire);
                    } catch (error) {
                      console.error('TiresCatalog addToCart error:', error);
                    }
                  }}
                  className="px-4 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
                >
                  Додати в кошик
                </button>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}