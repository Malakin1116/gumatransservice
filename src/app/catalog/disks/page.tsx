'use client';

import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import disksDataRaw from '../../../../data/disks.json';

export const dynamic = 'force-dynamic';

interface Disk {
  size: string;
  brand: string;
  price: number | null;
  country: string;
}

interface Tire {
  size: string;
  brand: string;
  price: number | null;
  country: string;
  model: string;
  axle: string;
}

const disksData: Disk[] = disksDataRaw as Disk[];

export default function DisksCatalog() {
  const [isMounted, setIsMounted] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      console.log('DisksCatalog: Mounting');
      setIsMounted(true);
    } catch (error) {
      console.error('DisksCatalog mount error:', error);
    }
  }, []);

  if (!isMounted) {
    console.log('DisksCatalog: Rendering loading');
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог дисків</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  console.log('DisksCatalog: Rendering disks', disksData);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог дисків</h1>
      <div className="mb-6">
        <Link href="/catalog/tires" className="text-blue-600 hover:underline text-sm font-medium">
          Перейти до каталогу шин
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {disksData.length === 0 ? (
          <p className="text-gray-600">Немає дисків для відображення.</p>
        ) : (
          disksData.map((disk, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col"
            >
              <h3 className="text-base font-semibold mb-2 text-gray-900">{disk.brand}</h3>
              <p className="text-gray-600 text-sm mb-1">Розмір: {disk.size}</p>
              <p className="text-gray-600 text-sm mb-1">Країна: {disk.country}</p>
              <p className="text-blue-600 font-bold text-sm mb-4">
                {disk.price ? `${disk.price.toLocaleString()} грн` : 'Ціна за запитом'}
              </p>
              {disk.price && (
                <button
                  onClick={() => {
                    try {
                      console.log('DisksCatalog: Adding to cart', disk);
                      addToCart({ ...disk, model: '', axle: '' } as Tire);
                    } catch (error) {
                      console.error('DisksCatalog addToCart error:', error);
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