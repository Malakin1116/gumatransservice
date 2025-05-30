'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
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
  type?: string;
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

function FilterIconSVG({ className = '' }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1m-2 4H6m10 4H8m6 4h-4" />
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
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [minPrice, maxPrice] = tiresData.reduce(
    (acc: [number, number], tire: Tire): [number, number] => [
      Math.min(acc[0], tire.price),
      Math.max(acc[1], tire.price)
    ],
    [Infinity, -Infinity]
  );
  const { addToCart } = useCart();

  useEffect(() => {
    try {
      const uniqueSizes = [...new Set(tiresData.map(tire => tire.size))].sort();
      const uniqueBrands = [...new Set(tiresData.map(tire => tire.brand))].sort();
      setSizes(uniqueSizes);
      setBrands(uniqueBrands);
      setPriceRange([minPrice, maxPrice]);
      setIsMounted(true);
    } catch (error) {
      console.error('Mount error:', error);
    }
  }, []);

  const handleFilter = (values: { size: string; brand: string; axle: string; priceMin?: number; priceMax?: number }) => {
    try {
      let filtered = tiresData;
      if (values.size) filtered = filtered.filter(tire => tire.size === values.size);
      if (values.brand) filtered = filtered.filter(tire => tire.brand === values.brand);
      if (values.axle) filtered = filtered.filter(tire => tire.axle === values.axle);
      filtered = filtered.filter(tire => tire.price >= priceRange[0] && tire.price <= priceRange[1]);
      setFilteredTires(filtered);
    } catch (error) {
      console.error('Filter error:', error);
    }
  };

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value) && value.length === 2) {
      setPriceRange([value[0], value[1]]);
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
      <div className="flex justify-end mb-6 sm:hidden">
        <button
          className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition-all duration-200"
          onClick={() => setIsFilterMenuOpen(true)}
        >
          <FilterIconSVG className="w-6 h-6 text-gray-800" />
        </button>
      </div>

      {isFilterMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsFilterMenuOpen(false)}
          ></div>
          <div
            className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${
              isFilterMenuOpen ? 'translate-x-0' : 'translate-x-full'
            }`}
          >
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Фільтри</h3>
                <button
                  onClick={() => setIsFilterMenuOpen(false)}
                  className="text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Formik
                initialValues={{ size: '', brand: '', axle: '', priceMin: minPrice, priceMax: maxPrice }}
                onSubmit={handleFilter}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="price-range-filter">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Діапазон цін (грн)</label>
                      <div className="w-[90%] max-w-[300px] mx-auto px-4">
                        <Slider
                          range
                          min={minPrice}
                          max={maxPrice}
                          value={priceRange}
                          onChange={handleSliderChange}
                          className="price-slider"
                          trackStyle={[{ backgroundColor: '#2563eb' }]}
                          handleStyle={[{ borderColor: '#2563eb', marginLeft: -4 }, { borderColor: '#2563eb' }]}
                        />
                      </div>
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span className="pr-2">{priceRange[0].toLocaleString()} грн</span>
                        <span className="pl-4 text-right">{priceRange[1].toLocaleString()} грн</span>
                      </div>
                    </div>
                    <Field
                      as="select"
                      name="size"
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      onClick={() => setIsFilterMenuOpen(false)}
                    >
                      Застосувати
                    </button>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </>
      )}

      <div className="hidden sm:block mb-8">
        <Formik
          initialValues={{ size: '', brand: '', axle: '', priceMin: minPrice, priceMax: maxPrice }}
          onSubmit={handleFilter}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div className="price-range-filter mb-4">
                <label className="block text-sm font-medium text-gray-600 mb-2">Діапазон цін (грн)</label>
                <div className="w-[150%] max-w-[480px] px-2">
                  <Slider
                    range
                    min={minPrice}
                    max={maxPrice}
                    value={priceRange}
                    onChange={handleSliderChange}
                    className="price-slider"
                    trackStyle={[{ backgroundColor: '#2563eb' }]}
                    handleStyle={[{ borderColor: '#2563eb', marginLeft: -4 }, { borderColor: '#2563eb' }]}
                  />
                </div>
                <div className="flex mt-2 text-sm text-gray-600">
                  <span className="pr-2">{priceRange[0].toLocaleString()} грн</span>
                  <span className="ml-auto pl-10 text-right">{priceRange[1].toLocaleString()} грн</span>
                </div>
              </div>
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
                onClick={() => addToCart({ ...tire, type: 'tire' })}
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