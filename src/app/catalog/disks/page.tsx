'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Head from 'next/head';

interface Disk {
  size: string;
  brand: string;
  price: number;
  country: string;
}

interface Tire {
  size: string;
  brand: string;
  price: number;
  country: string;
  model: string;
  axle: string;
}

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

const disksData: Disk[] = [
  {
    size: "22.5*11.75/0",
    brand: "DK",
    price: 4750,
    country: "Китай"
  },
  {
    size: "22.5*11.75/120",
    brand: "DK",
    price: 4900,
    country: "Китай"
  },
  {
    size: "22.5*11.75/135",
    brand: "LEMMERZ",
    price: 7500,
    country: "Німеччина"
  },
  {
    size: "22.5*9.00",
    brand: "LEMMERZ",
    price: 7000,
    country: "Німеччина"
  }
];

export default function DisksCatalog() {
  const [isMounted, setIsMounted] = useState(false);
  const [filteredDisks, setFilteredDisks] = useState<Disk[]>(disksData);
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const uniqueSizes = [...new Set(disksData.map(disk => disk.size))].sort();
      const uniqueBrands = [...new Set(disksData.map(disk => disk.brand))].sort();
      setSizes(uniqueSizes);
      setBrands(uniqueBrands);
      setIsMounted(true);
    } catch (error) {
      console.error('Mount error:', error);
    }
  }, []);

  const handleFilter = (values: { size: string; brand: string }) => {
    try {
      let filtered = disksData;
      if (values.size) filtered = filtered.filter(disk => disk.size === values.size);
      if (values.brand) filtered = filtered.filter(disk => disk.brand === values.brand);
      setFilteredDisks(filtered);
    } catch (error) {
      console.error('Filter error:', error);
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог дисків</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог дисків для вантажівок</title>
        <meta name="description" content="Вантажні диски від провідних брендів." />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог дисків</h1>
      <div className="mb-6">
        <Link href="/catalog/tires" className="text-blue-600 hover:underline text-sm font-medium">
          Перейти до каталогу шин
        </Link>
      </div>
      <div className="mb-8">
        <Formik
          initialValues={{ size: '', brand: '' }}
          onSubmit={handleFilter}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field
                  as="select"
                  name="size"
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('size', e.target.value);
                    handleFilter({ ...values, size: e.target.value });
                  }}
                >
                  <option value="">Всі розміри</option>
                  {sizes.map(size => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="brand"
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('brand', e.target.value);
                    handleFilter({ ...values, brand: e.target.value });
                  }}
                >
                  <option value="">Всі бренди</option>
                  {brands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Field>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredDisks.length === 0 ? (
          <p className="text-gray-600 col-span-full">Немає дисків для відображення.</p>
        ) : (
          filteredDisks.map((disk, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <DiskPlaceholderSVG className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-base font-semibold mb-2 text-gray-900">{disk.brand}</h3>
              <p className="text-gray-600 text-sm mb-1">Розмір: {disk.size}</p>
              <p className="text-gray-600 text-sm mb-1">Країна: {disk.country}</p>
              <p className="text-blue-600 font-bold text-sm mb-4">{disk.price.toLocaleString()} грн</p>
              <button
                onClick={() => addToCart({ ...disk, model: '', axle: '' } as Tire)}
                className="px-4 py-2 rounded text-sm bg-blue-600 text-white hover:bg-blue-700"
              >
                Додати в кошик
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}