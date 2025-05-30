'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import { useCart } from '../../context/CartContext';
import Link from 'next/link';
import Head from 'next/head';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number;
  country: string;
}

function TirePlaceholderSVG({ width = 200, height = 200, className = '' }) {
  return (
    <svg width={width} height={height} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <circle cx="100" cy="100" r="90" stroke="#1F2937" strokeWidth="30" fill="none"/>
      <circle cx="100" cy="100" r="60" fill="#4B5563"/>
      <circle cx="100" cy="100" r="30" fill="#6B7280"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(0 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(45 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(90 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(135 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(180 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(225 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(270 100 100)"/>
      <rect x="90" y="5" width="20" height="30" fill="#1F2937" transform="rotate(315 100 100)"/>
      <circle cx="80" cy="60" r="6" fill="#D1D5DB"/>
      <circle cx="120" cy="60" r="6" fill="#D1D5DB"/>
      <circle cx="60" cy="100" r="6" fill="#D1D5DB"/>
      <circle cx="140" cy="100" r="6" fill="#D1D5DB"/>
      <circle cx="80" cy="140" r="6" fill="#D1D5DB"/>
      <circle cx="120" cy="140" r="6" fill="#D1D5DB"/>
    </svg>
  );
}

const tiresData: Tire[] = [
  {
    size: "215/75R17.5",
    brand: "Windforce",
    model: "wd2020",
    axle: "ВЕДУЧА",
    price: 5800,
    country: "Китай"
  },
  {
    size: "215/75R17.5",
    brand: "SPORTRAK",
    model: "SP305",
    axle: "ВЕДУЧА",
    price: 5400,
    country: "Китай"
  },
  {
    size: "215/75R17.5",
    brand: "Greentrac",
    model: "GTRА1",
    axle: "УНІВ.",
    price: 6800,
    country: "Тайланд"
  },
  {
    size: "215/75R17.5",
    brand: "Apollo",
    model: "RA",
    axle: "КЕРМО",
    price: 7800,
    country: "Угорщина"
  },
  {
    size: "215/75R17.5",
    brand: "Apollo",
    model: "RD",
    axle: "ВЕДУЧА",
    price: 7900,
    country: "Угорщина"
  },
  {
    size: "225/75R17.5",
    brand: "Apollo",
    model: "RD",
    axle: "ВЕДУЧА",
    price: 7900,
    country: "Угорщина"
  },
  {
    size: "225/75R17.5",
    brand: "Apollo",
    model: "RA",
    axle: "КЕРМО",
    price: 7900,
    country: "Угорщина"
  }
];

export default function TiresCatalog() {
  const [isMounted, setIsMounted] = useState(false);
  const [filteredTires, setFilteredTires] = useState<Tire[]>(tiresData);
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const uniqueSizes = [...new Set(tiresData.map(tire => tire.size))].sort();
      const uniqueBrands = [...new Set(tiresData.map(tire => tire.brand))].sort();
      setSizes(uniqueSizes);
      setBrands(uniqueBrands);
      setIsMounted(true);
    } catch (error) {
      console.error('Mount error:', error);
    }
  }, []);

  const handleFilter = (values: { size: string; brand: string; axle: string }) => {
    try {
      let filtered = tiresData;
      if (values.size) filtered = filtered.filter(tire => tire.size === values.size);
      if (values.brand) filtered = filtered.filter(tire => tire.brand === values.brand);
      if (values.axle) filtered = filtered.filter(tire => tire.axle === values.axle);
      setFilteredTires(filtered);
    } catch (error) {
      console.error('Filter error:', error);
    }
  };

  if (!isMounted) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог шин</h1>
        <p>Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог шин для вантажівок</title>
        <meta name="description" content="Вантажні шини від провідних брендів." />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог шин</h1>
      <div className="mb-6">
        <Link href="/catalog/disks" className="text-blue-600 hover:underline text-sm font-medium">
          Перейти до каталогу дисків
        </Link>
      </div>
      <div className="mb-8">
        <Formik
          initialValues={{ size: '', brand: '', axle: '' }}
          onSubmit={handleFilter}
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
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
                <Field
                  as="select"
                  name="axle"
                  className="p-2 border border-gray-300 rounded-lg"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('axle', e.target.value);
                    handleFilter({ ...values, axle: e.target.value });
                  }}
                >
                  <option value="">Всі осі</option>
                  <option value="КЕРМО">Кермо</option>
                  <option value="ВЕДУЧА">Ведуча</option>
                  <option value="ПРИЧІП">Причіп</option>
                  <option value="УНІВ.">Універсальна</option>
                </Field>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTires.length === 0 ? (
          <p className="text-gray-600 col-span-full">Немає шин для відображення.</p>
        ) : (
          filteredTires.map((tire, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 flex flex-col">
              <TirePlaceholderSVG className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-base font-semibold mb-2 text-gray-900">{tire.brand} {tire.model}</h3>
              <p className="text-gray-600 text-sm mb-1">Розмір: {tire.size}</p>
              <p className="text-gray-600 text-sm mb-1">Вісь: {tire.axle}</p>
              <p className="text-gray-600 text-sm mb-1">Країна: {tire.country}</p>
              <p className="text-blue-600 font-bold text-sm mb-4">{tire.price.toLocaleString()} грн</p>
              <button
                onClick={() => addToCart(tire)}
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