'use client';

import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import tiresData from '../../../../data/tires.json';
import { useCart } from '../../context/CartContext';
import Head from 'next/head';
import Link from 'next/link';
import TirePlaceholderSVG from '../../components/TirePlaceholderSVG';
import FilterIconSVG from '../../components/FilterIconSVG';
import GridIconSVG from '../../components/GridIconSVG';
import ListIconSVG from '../../components/ListIconSVG';
import ScrollToTopArrow from '../../components/ScrollToTopArrow';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
  type?: string;
}

export default function DisksCatalog() {
  const [tires, setTires] = useState<Tire[]>(tiresData);
  const [filteredTires, setFilteredTires] = useState<Tire[]>(tiresData);
  const [displayedTires, setDisplayedTires] = useState<Tire[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [brands, setBrands] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState<'price' | 'brand' | 'size' | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [minPrice, maxPrice] = tiresData.reduce(
    (acc, tire) => {
      if (tire.price) {
        return [Math.min(acc[0], tire.price), Math.max(acc[1], tire.price)];
      }
      return acc;
    },
    [Infinity, -Infinity]
  );

  const { addToCart } = useCart();
  const observerRef = useRef(null);

  useEffect(() => {
    const uniqueSizes = [...new Set(tiresData.map((tire) => tire.size))].sort();
    const uniqueBrands = [...new Set(tiresData.map((tire) => tire.brand))].sort();
    setSizes(uniqueSizes);
    setBrands(uniqueBrands);
    setPriceRange([minPrice, maxPrice]);
  }, []);

  const applyFiltersAndSort = (values = { size: '', brand: '', axle: '' }) => {
    let filtered = tires.filter((tire) => tire.type === 'ДИСК');
    if (values.size) filtered = filtered.filter((tire) => tire.size === values.size);
    if (values.brand) filtered = filtered.filter((tire) => tire.brand === values.brand);
    if (values.axle) filtered = filtered.filter((tire) => tire.axle === values.axle);
    filtered = filtered.filter((tire) => tire.price && tire.price >= priceRange[0] && tire.price <= priceRange[1]);

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (sortBy === 'price') {
          const priceA = a.price || Infinity;
          const priceB = b.price || Infinity;
          return sortOrder === 'asc' ? priceA - priceB : priceB - priceA;
        }
        if (sortBy === 'brand') {
          return sortOrder === 'asc'
            ? a.brand.localeCompare(b.brand)
            : b.brand.localeCompare(a.brand);
        }
        if (sortBy === 'size') {
          return sortOrder === 'asc'
            ? a.size.localeCompare(b.size)
            : b.size.localeCompare(a.size);
        }
        return 0;
      });
    }

    setFilteredTires(filtered);
    setPage(1);
    setDisplayedTires(filtered.slice(0, itemsPerPage));
    setHasMore(filtered.length > itemsPerPage);
  };

  useEffect(() => {
    applyFiltersAndSort();
  }, [tires, sortBy, sortOrder, itemsPerPage, priceRange]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPage((prevPage) => {
            const newPage = prevPage + 1;
            const newItems = filteredTires.slice(0, newPage * itemsPerPage);
            setDisplayedTires(newItems);
            setHasMore(newItems.length < filteredTires.length);
            return newPage;
          });
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [filteredTires, hasMore, itemsPerPage]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilter = (values: { size: string; brand: string; axle: string }) => {
    applyFiltersAndSort(values);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог дисків для вантажівок | Назва сайту</title>
        <meta name="description" content="Купіть диски для вантажівок від провідних брендів за вигідними цінами. Широкий вибір розмірів і моделей." />
        <meta name="keywords" content="вантажні диски, диски для вантажівок, купити диски, ціни на диски" />
      </Head>
      <h1 className="text-3xl font-bold mb-4">Каталог дисків</h1>
      <div className="mb-6">
        <Link href="/catalog/tires" className="text-blue-600 hover:underline text-sm">
          Перейти до каталогу шин
        </Link>
      </div>
      <div className="flex justify-end items-center mb-6 flex-col sm:flex-row gap-4">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-lg shadow-sm transition-all duration-200 ${
              viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <GridIconSVG className="w-6 h-6" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-lg shadow-sm transition-all duration-200 ${
              viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
            }`}
          >
            <ListIconSVG className="w-6 h-6" />
          </button>
          <button
            className="sm:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shadow-sm transition-all duration-200"
            onClick={() => setIsFilterMenuOpen(true)}
          >
            <FilterIconSVG className="w-6 h-6" />
          </button>
        </div>
      </div>

      {isFilterMenuOpen && (
        <>
          <div className="burger-overlay" onClick={() => setIsFilterMenuOpen(false)}></div>
          <div className={`burger-menu ${isFilterMenuOpen ? '' : 'burger-menu-closed'}`}>
            <div className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">Фільтри</h3>
                <button onClick={() => setIsFilterMenuOpen(false)} className="text-gray-600 hover:text-gray-800 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <Formik
                initialValues={{ size: sizes[0], brand: brands[0], axle: 'КЕРМО' }}
                onSubmit={handleFilter}
                enableReinitialize
              >
                {({ values }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="price-range-filter">
                      <label className="block text-sm text-gray-600 mb-2">Діапазон цін (грн)</label>
                      <Slider
                        range
                        min={minPrice}
                        max={maxPrice}
                        value={priceRange}
                        onChange={(value) => setPriceRange(value as [number, number])}
                        className="price-slider"
                        trackStyle={[{ backgroundColor: '#2563eb' }]}
                        handleStyle={[{ borderColor: '#2563eb' }, { borderColor: '#2563eb' }]}
                      />
                      <div className="flex justify-between mt-2 text-sm text-gray-600">
                        <span>{priceRange[0].toLocaleString()} грн</span>
                        <span>{priceRange[1].toLocaleString()} грн</span>
                      </div>
                    </div>
                    <Field
                      as="select"
                      name="size"
                      className="modern-select"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        values.size = e.target.value;
                        handleFilter(values);
                      }}
                    >
                      {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="brand"
                      className="modern-select"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        values.brand = e.target.value;
                        handleFilter(values);
                      }}
                    >
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="axle"
                      className="modern-select"
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        values.axle = e.target.value;
                        handleFilter(values);
                      }}
                    >
                      <option value="КЕРМО">Кермо</option>
                      <option value="ВЕДУЧА">Ведуча</option>
                      <option value="ПРИЧІП">Причіп</option>
                      <option value="УНІВ.">Універсальна</option>
                    </Field>
                    <div className="flex flex-col gap-2">
                      <select
                        value={sortBy || ''}
                        onChange={(e) => {
                          setSortBy(e.target.value as 'price' | 'brand' | 'size' | null);
                          handleFilter(values);
                        }}
                        className="modern-select"
                      >
                        <option value="">Сортувати</option>
                        <option value="price">За ціною</option>
                        <option value="brand">За брендом</option>
                        <option value="size">За розміром</option>
                      </select>
                      <select
                        value={sortOrder}
                        onChange={(e) => {
                          setSortOrder(e.target.value as 'asc' | 'desc');
                          handleFilter(values);
                        }}
                        className="modern-select"
                      >
                        <option value="asc">Зростання</option>
                        <option value="desc">Спадання</option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm hover:bg-blue-700 transition-all duration-200 text-sm font-medium"
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
        <div className="price-range-filter mb-4">
          <label className="block text-sm text-gray-600 mb-2">Діапазон цін (грн)</label>
          <Slider
            range
            min={minPrice}
            max={maxPrice}
            value={priceRange}
            onChange={(value) => setPriceRange(value as [number, number])}
            className="price-slider"
            trackStyle={[{ backgroundColor: '#2563eb' }]}
            handleStyle={[{ borderColor: '#2563eb' }, { borderColor: '#2563eb' }]}
          />
          <div className="flex justify-between mt-2 text-sm text-gray-600">
            <span>{priceRange[0].toLocaleString()} грн</span>
            <span>{priceRange[1].toLocaleString()} грн</span>
          </div>
        </div>
        <Formik
          initialValues={{ size: sizes[0], brand: brands[0], axle: 'КЕРМО' }}
          onSubmit={handleFilter}
          enableReinitialize
        >
          {({ values }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Field
                  as="select"
                  name="size"
                  className="modern-select"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    values.size = e.target.value;
                    handleFilter(values);
                  }}
                >
                  {sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="brand"
                  className="modern-select"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    values.brand = e.target.value;
                    handleFilter(values);
                  }}
                >
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="axle"
                  className="modern-select"
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    values.axle = e.target.value;
                    handleFilter(values);
                  }}
                >
                  <option value="КЕРМО">Кермо</option>
                  <option value="ВЕДУЧА">Ведуча</option>
                  <option value="ПРИЧІП">Причіп</option>
                  <option value="УНІВ.">Універсальна</option>
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <select
                  value={sortBy || ''}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'price' | 'brand' | 'size' | null);
                    handleFilter(values);
                  }}
                  className="modern-select"
                >
                  <option value="">Сортувати</option>
                  <option value="price">За ціною</option>
                  <option value="brand">За брендом</option>
                  <option value="size">За розміром</option>
                </select>
                <select
                  value={sortOrder}
                  onChange={(e) => {
                    setSortOrder(e.target.value as 'asc' | 'desc');
                    handleFilter(values);
                  }}
                  className="modern-select"
                >
                  <option value="asc">Зростання</option>
                  <option value="desc">Спадання</option>
                </select>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {viewMode === 'grid' ? (
        <div className="catalog-grid gap-4 mb-12">
          {displayedTires.map((tire, index) => (
            <div key={index} className="catalog-card card-hover">
              <TirePlaceholderSVG className="w-full h-32 object-cover rounded mb-4" />
              <h3 className="text-base font-semibold mb-2">{tire.brand} {tire.model}</h3>
              <p className="text-gray-600 text-sm mb-1">Розмір: {tire.size}</p>
              <p className="text-gray-600 text-sm mb-1">Вісь: {tire.axle || '-'}</p>
              <p className="text-gray-600 text-sm mb-1">Країна: {tire.country}</p>
              <p className={`text-sm mb-2 ${tire.price ? 'text-green-600' : 'text-gray-500'}`}>
                {tire.price ? 'В наявності' : 'Немає в наявності'}
              </p>
              <p className="text-blue-600 font-bold text-sm mb-4">
                {tire.price ? `${tire.price.toLocaleString()} грн` : 'Ціна за запитом'}
              </p>
              <button
                onClick={() => tire.price && addToCart(tire)}
                className={`button-pulse px-4 py-2 rounded text-sm mt-auto ${
                  tire.price
                    ? 'bg-blue-600 text-white hover:bg-blue-700'
                    : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
                disabled={!tire.price}
              >
                Додати в кошик
              </button>
            </div>
          ))}
          {hasMore && (
            <div ref={observerRef} className="text-center py-4">
              <span className="text-gray-600 text-sm">Завантаження...</span>
            </div>
          )}
        </div>
      ) : (
        <div className="catalog-list mb-12">
          <table>
            <thead>
              <tr>
                <th>Розмір</th>
                <th>Бренд</th>
                <th>Модель</th>
                <th>Вісь</th>
                <th>Ціна (безгот. з ПДВ)</th>
                <th>Країна</th>
                <th>Статус</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {displayedTires.map((tire, index) => (
                <tr key={index}>
                  <td>{tire.size}</td>
                  <td>{tire.brand}</td>
                  <td>{tire.model || '-'}</td>
                  <td>{tire.axle || '-'}</td>
                  <td>{tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}</td>
                  <td>{tire.country}</td>
                  <td className={tire.price ? 'text-green-600' : 'text-gray-500'}>
                    {tire.price ? 'В наявності' : 'Немає в наявності'}
                  </td>
                  <td>
                    <button
                      onClick={() => tire.price && addToCart(tire)}
                      className={`button-pulse px-3 py-1 rounded text-sm ${
                        tire.price
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      }`}
                      disabled={!tire.price}
                    >
                      Додати
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {hasMore && (
            <div ref={observerRef} className="text-center py-4">
              <span className="text-gray-600 text-sm">Завантаження...</span>
            </div>
          )}
        </div>
      )}

      {showScrollToTop && <ScrollToTopArrow onClick={scrollToTop} />}
    </div>
  );
}