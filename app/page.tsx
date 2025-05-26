import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import clsx from 'clsx';
import Papa from 'papaparse';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Link from 'next/link';

// Типи для даних прайс-листа
interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number;
  country: string;
}

// Дані прайс-листа (тимчасово захардкоджені, заміни на CSV-файл пізніше)
const tireData = [
  { size: '215/75R17.5', brand: 'Windforce', model: 'wd2020', axle: 'ВЕДУЧА', price: 5800, country: 'Китай' },
  { size: '215/75R17.5', brand: 'SPORTRAK', model: 'SP305', axle: 'ВЕДУЧА', price: 5400, country: 'Китай' },
  { size: '215/75R17.5', brand: 'Greentrac', model: 'GTRА1', axle: 'УНІВ.', price: 6800, country: 'Тайланд' },
  { size: '215/75R17.5', brand: 'Apollo', model: 'RA', axle: 'КЕРМО', price: 7800, country: 'Угорщина' },
  { size: '225/75R17.5', brand: 'Apollo', model: 'RD', axle: 'ВЕДУЧА', price: 7900, country: 'Угорщина' },
  // Додай решту даних із прайс-листа вручну або використовуй CSV
];

export default function Catalog() {
  const [tires, setTires] = useState<Tire[]>(tireData);
  const [filteredTires, setFilteredTires] = useState<Tire[]>(tireData);
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  // Ініціалізація фільтрів
  useEffect(() => {
    setSizes([...new Set(tireData.map((tire) => tire.size))].sort());
    setBrands([...new Set(tireData.map((tire) => tire.brand))].sort());
  }, []);

  // Фільтрація
  const handleFilter = (values: { size: string; brand: string; axle: string }) => {
    let filtered = tireData;
    if (values.size) filtered = filtered.filter((tire) => tire.size === values.size);
    if (values.brand) filtered = filtered.filter((tire) => tire.brand === values.brand);
    if (values.axle) filtered = filtered.filter((tire) => tire.axle === values.axle);
    setFilteredTires(filtered);
  };

  // Дані для графіка
  const priceData = brands.map((brand) => ({
    name: brand,
    avgPrice:
      tires
        .filter((tire) => tire.brand === brand)
        .reduce((sum, tire) => sum + tire.price, 0) /
      tires.filter((tire) => tire.brand === brand).length,
  }));

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-900 text-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
          <h1 className="text-2xl font-bold">ТОВ "ГУМАТРАНССЕРВІС"</h1>
          <nav className="space-x-4">
            <Link href="/" className="underline">Каталог</Link>
            <Link href="/services" className="hover:underline">Послуги</Link>
            <Link href="/contacts" className="hover:underline">Контакти</Link>
          </nav>
        </div>
      </header>

      {/* Фільтри */}
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold mb-6">Каталог шин</h2>
        <Formik
          initialValues={{ size: '', brand: '', axle: '' }}
          onSubmit={handleFilter}
        >
          <Form className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Field as="select" name="size" className="p-3 border rounded">
              <option value="">Всі розміри</option>
              {sizes.map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </Field>
            <Field as="select" name="brand" className="p-3 border rounded">
              <option value="">Всі бренди</option>
              {brands.map((brand) => (
                <option key={brand} value={brand}>{brand}</option>
              ))}
            </Field>
            <Field as="select" name="axle" className="p-3 border rounded">
              <option value="">Всі осі</option>
              <option value="КЕРМО">Кермо</option>
              <option value="ВЕДУЧА">Ведуча</option>
              <option value="ПРИЧІП">Причіп</option>
              <option value="УНІВ.">Універсальна</option>
            </Field>
            <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Фільтрувати
            </button>
          </Form>
        </Formik>

        {/* Таблиця */}
        <div className="overflow-x-auto">
          <table className="w-full bg-white shadow rounded-lg">
            <thead>
              <tr className="bg-blue-100">
                <th className="p-4 text-left">Розмір</th>
                <th className="p-4 text-left">Бренд</th>
                <th className="p-4 text-left">Модель</th>
                <th className="p-4 text-left">Вісь</th>
                <th className="p-4 text-left">Ціна (безгот. з ПДВ)</th>
                <th className="p-4 text-left">Країна</th>
              </tr>
            </thead>
            <tbody>
              {filteredTires.map((tire, index) => (
                <tr key={index} className="border-b hover:bg-blue-50">
                  <td className="p-4">{tire.size}</td>
                  <td className="p-4">{tire.brand}</td>
                  <td className="p-4">{tire.model}</td>
                  <td className="p-4">{tire.axle}</td>
                  <td className="p-4">{tire.price.toLocaleString()} грн</td>
                  <td className="p-4">{tire.country}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Графік цін */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold mb-6">Середні ціни за брендом</h2>
        <div className="bg-white p-6 rounded-lg shadow">
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={priceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip formatter={(value: number) => `${value.toLocaleString()} грн`} />
              <Bar dataKey="avgPrice" fill="#2563eb" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p>ТОВ "ГУМАТРАНССЕРВІС" © 2025. Всі права захищено.</p>
          <p>м. Київ, вул. Авторемонтна, 10 | +380 (50) 123-45-67</p>
        </div>
      </footer>
    </div>
  );
}