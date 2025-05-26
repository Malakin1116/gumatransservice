'use client';

import { useState, useEffect } from 'react';
import { Formik, Form, Field } from 'formik';
import tiresData from '../../../data/tires.json';
import AddTireButton from '../components/add-tire-button.tsx';
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

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
  type?: string;
}

export default function Catalog() {
  const [tires, setTires] = useState<Tire[]>(tiresData);
  const [filteredTires, setFilteredTires] = useState<Tire[]>(tiresData);
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);

  useEffect(() => {
    setSizes([...new Set(tiresData.map((tire) => tire.size))].sort());
    setBrands([...new Set(tiresData.map((tire) => tire.brand))].sort());
  }, []);

  const handleFilter = (values: { size: string; brand: string; axle: string; type: string }) => {
    let filtered = tires;
    if (values.size) filtered = filtered.filter((tire) => tire.size === values.size);
    if (values.brand) filtered = filtered.filter((tire) => tire.brand === values.brand);
    if (values.axle) filtered = filtered.filter((tire) => tire.axle === values.axle);
    if (values.type) filtered = filtered.filter((tire) => (values.type === 'ДИСК' ? tire.type === 'ДИСК' : !tire.type));
    setFilteredTires(filtered);
  };

  const handleAddTire = (newTire: Tire) => {
    setTires((prev) => [...prev, newTire]);
    setFilteredTires((prev) => [...prev, newTire]);
  };

  const priceData = brands
    .map((brand) => {
      const brandTires = tires.filter((tire) => tire.brand === brand && tire.price !== null);
      const avgPrice =
        brandTires.length > 0
          ? brandTires.reduce((sum, tire) => sum + (tire.price || 0), 0) / brandTires.length
          : 0;
      return { name: brand, avgPrice };
    })
    .filter((data) => data.avgPrice > 0);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6">Каталог шин і дисків</h2>
      <div className="flex justify-end mb-6">
        <AddTireButton onAddTire={handleAddTire} />
      </div>
      <Formik
        initialValues={{ size: '', brand: '', axle: '', type: '' }}
        onSubmit={handleFilter}
      >
        <Form className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
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
          <Field as="select" name="type" className="p-3 border rounded">
            <option value="">Всі типи</option>
            <option value="ШИНА">Шини</option>
            <option value="ДИСК">Диски</option>
          </Field>
          <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
            Фільтрувати
          </button>
        </Form>
      </Formik>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow rounded-lg">
          <thead>
            <tr className="bg-blue-100">
              <th className="p-4 text-left">Тип</th>
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
                <td className="p-4">{tire.type || 'ШИНА'}</td>
                <td className="p-4">{tire.size}</td>
                <td className="p-4">{tire.brand}</td>
                <td className="p-4">{tire.model || '-'}</td>
                <td className="p-4">{tire.axle || '-'}</td>
                <td className="p-4">{tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}</td>
                <td className="p-4">{tire.country}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <section className="py-12">
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
    </div>
  );
}