'use client';

import { useState, useEffect, useRef } from 'react';
import { Formik, Form, Field } from 'formik';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import tiresDataRaw from './../../../../data/tires.json';
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
}

const tiresData: Tire[] = tiresDataRaw as Tire[];

export default function TiresCatalog() {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTire, setSelectedTire] = useState<Tire | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [filterValues, setFilterValues] = useState<{ size: string; brand: string; axle: string }>({
    size: '',
    brand: '',
    axle: '',
  });
  const [minPrice, maxPrice] = tiresData.reduce(
    (acc: [number, number], tire: Tire): [number, number] => {
      if (tire.price !== null) {
        return [Math.min(acc[0], tire.price), Math.max(acc[1], tire.price)];
      }
      return acc;
    },
    [Infinity, -Infinity]
  );

  const { addToCart } = useCart();
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const uniqueSizes = [...new Set(tiresData.map((tire) => tire.size))].sort();
    const uniqueBrands = [...new Set(tiresData.map((tire) => tire.brand))].sort();
    setSizes(uniqueSizes);
    setBrands(uniqueBrands);
    setPriceRange([minPrice === Infinity ? 0 : minPrice, maxPrice === -Infinity ? 100000 : maxPrice]);
  }, []);

  const applyFiltersAndSort = (values: { size: string; brand: string; axle: string }) => {
    let filtered = tires;
    if (values.size) filtered = filtered.filter((tire) => tire.size === values.size);
    if (values.brand) filtered = filtered.filter((tire) => tire.brand === values.brand);
    if (values.axle) filtered = filtered.filter((tire) => tire.axle === values.axle);
    filtered = filtered.filter((tire) => !tire.price || (tire.price >= priceRange[0] && tire.price <= priceRange[1]));

    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        if (a.price === null && b.price !== null) return 1;
        if (a.price !== null && b.price === null) return -1;
        if (a.price === null && b.price === null) return 0;

        if (sortBy === 'price') {
          const priceA = a.price!;
          const priceB = b.price!;
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
    } else {
      filtered = [...filtered].sort((a, b) => {
        if (a.price === null && b.price !== null) return 1;
        if (a.price !== null && b.price === null) return -1;
        return 0;
      });
    }

    setFilteredTires(filtered);
    setPage(1);
    setDisplayedTires(filtered.slice(0, itemsPerPage));
    setHasMore(filtered.length > itemsPerPage);
  };

  useEffect(() => {
    applyFiltersAndSort(filterValues);
  }, [tires, sortBy, sortOrder, priceRange]);

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
    setFilterValues(values);
    applyFiltersAndSort(values);
  };

  const openModal = (tire: Tire) => {
    setSelectedTire(tire);
    setIsModalOpen(true);
    setSubmitted(false);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedTire(null);
    setSubmitted(false);
  };

  const sendRequestToTelegram = async (values: { phone: string; contactMethod: string; messenger?: string }) => {
    if (!selectedTire) return;

    const botToken = 'YOUR_BOT_TOKEN';
    const chatId = 'YOUR_CHAT_ID';

    const message = `
Запит на шину:
Бренд: ${selectedTire.brand}
Модель: ${selectedTire.model}
Розмір: ${selectedTire.size}
Вісь: ${selectedTire.axle}
Країна: ${selectedTire.country}
Телефон: ${values.phone}
Спосіб зв’язку: ${values.contactMethod === 'call' ? 'Перетелефонувати' : 'Месенджер'}
${values.messenger ? `Месенджер: ${values.messenger}` : ''}
Час запиту: ${new Date().toLocaleString()}
    `;

    try {
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
      const data = await response.json();
      if (!data.ok) {
        throw new Error(`Помилка відправки: ${data.description}`);
      }
      return true;
    } catch (error) {
      console.error('Помилка відправки в Telegram:', error);
      throw error;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог шин для вантажівок | Назва сайту</title>
        <meta name="description" content="Купіть вантажні шини від провідних брендів за вигідними цінами. Широкий вибір розмірів і моделей." />
        <meta name="keywords" content="вантажні шини, шини для вантажівок, купити шини, ціни на шини" />
      </Head>
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Каталог шин</h1>
      <div className="mb-6">
        <Link href="/catalog/disks" className="text-blue-600 hover:underline text-sm font-medium">
          Перейти до каталогу дисків
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
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsFilterMenuOpen(false)}></div>
          <div className={`fixed top-0 right-0 h-full w-80 bg-white shadow-2xl z-50 transform transition-transform duration-300 ${isFilterMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
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
                initialValues={{ size: filterValues.size, brand: filterValues.brand, axle: filterValues.axle }}
                onSubmit={handleFilter}
                enableReinitialize
              >
                {({ values, setFieldValue }) => (
                  <Form className="flex flex-col gap-4">
                    <div className="price-range-filter">
                      <label className="block text-sm font-medium text-gray-600 mb-2">Діапазон цін (грн)</label>
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
                      className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={values.size}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('size', e.target.value);
                        handleFilter({ ...values, size: e.target.value });
                      }}
                    >
                      <option value="">Всі розміри</option>
                      {sizes.map((size) => (
                        <option key={size} value={size}>{size}</option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="brand"
                      className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={values.brand}
                      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                        setFieldValue('brand', e.target.value);
                        handleFilter({ ...values, brand: e.target.value });
                      }}
                    >
                      <option value="">Всі бренди</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>{brand}</option>
                      ))}
                    </Field>
                    <Field
                      as="select"
                      name="axle"
                      className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                      value={values.axle}
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
                    <div className="flex flex-col gap-2">
                      <select
                        value={sortBy ?? ''}
                        onChange={(e) => {
                          setSortBy(e.target.value as 'price' | 'brand' | 'size' | null);
                          handleFilter(values);
                        }}
                        className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                        className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
          <label className="block text-sm font-medium text-gray-600 mb-2">Діапазон цін (грн)</label>
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
          initialValues={{ size: filterValues.size, brand: filterValues.brand, axle: filterValues.axle }}
          onSubmit={handleFilter}
          enableReinitialize
        >
          {({ values, setFieldValue }) => (
            <Form className="flex flex-col gap-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <Field
                  as="select"
                  name="size"
                  className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={values.size}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('size', e.target.value);
                    handleFilter({ ...values, size: e.target.value });
                  }}
                >
                  <option value="">Всі розміри</option>
                  {sizes.map((size) => (
                    <option key={size} value={size}>{size}</option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="brand"
                  className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={values.brand}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    setFieldValue('brand', e.target.value);
                    handleFilter({ ...values, brand: e.target.value });
                  }}
                >
                  <option value="">Всі бренди</option>
                  {brands.map((brand) => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                </Field>
                <Field
                  as="select"
                  name="axle"
                  className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={values.axle}
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
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                <select
                  value={sortBy ?? ''}
                  onChange={(e) => {
                    setSortBy(e.target.value as 'price' | 'brand' | 'size' | null);
                    handleFilter(values);
                  }}
                  className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
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
                  className="modern-select w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  <option value="asc">Зростання</option>
                  <option value="desc">Спадання</option>
                </select>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      {isModalOpen && selectedTire && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-gray-800">Відправити запит</h3>
              <button onClick={closeModal} className="text-gray-600 hover:text-gray-800">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            {submitted ? (
              <div className="text-center">
                <p className="text-green-600 text-lg mb-4">Дякуємо за ваш запит! Ми зв’яжемося з вами найближчим часом.</p>
                <button
                  onClick={closeModal}
                  className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                  Закрити
                </button>
              </div>
            ) : (
              <Formik
                initialValues={{ phone: '', contactMethod: 'call', messenger: '' }}
                onSubmit={async (values, { resetForm }) => {
                  try {
                    await sendRequestToTelegram(values);
                    setSubmitted(true);
                    resetForm();
                  } catch (error) {
                    alert('Запит оформлено, але не вдалося відправити в Telegram. Ми зв’яжемося з вами.');
                  }
                }}
              >
                {({ values }) => (
                  <Form className="flex flex-col gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Номер телефону</label>
                      <Field
                        name="phone"
                        type="tel"
                        className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        placeholder="+380..."
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Спосіб зв’язку</label>
                      <div className="flex gap-4">
                        <label className="flex items-center">
                          <Field type="radio" name="contactMethod" value="call" className="mr-2" />
                          Перетелефонувати
                        </label>
                        <label className="flex items-center">
                          <Field type="radio" name="contactMethod" value="messenger" className="mr-2" />
                          Відповісти в месенджер
                        </label>
                      </div>
                    </div>
                    {values.contactMethod === 'messenger' && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Оберіть месенджер</label>
                        <Field
                          as="select"
                          name="messenger"
                          className="w-full p-3 border border-gray-300 rounded focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          required
                        >
                          <option value="">Виберіть месенджер</option>
                          <option value="Telegram">Telegram</option>
                          <option value="Viber">Viber</option>
                          <option value="WhatsApp">WhatsApp</option>
                          <option value="Signal">Signal</option>
                        </Field>
                      </div>
                    )}
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                      Надіслати
                    </button>
                  </Form>
                )}
              </Formik>
            )}
          </div>
        </div>
      )}

      {viewMode === 'grid' ? (
        <div className="catalog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredTires.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">На жаль, нічого не знайдено</h3>
              <p className="text-gray-500 text-sm">Спробуйте змінити параметри фільтрів, щоб знайти потрібні шини.</p>
            </div>
          ) : (
            <>
              {displayedTires.map((tire, index) => (
                <div
                  key={index}
                  className="catalog-card bg-white rounded-lg shadow-lg p-6 flex flex-col hover:shadow-xl transition-shadow duration-300"
                >
                  <TirePlaceholderSVG className="w-full h-32 object-cover rounded mb-4" />
                  <h3 className="text-base font-semibold mb-2 text-gray-900">{tire.brand} {tire.model}</h3>
                  <p className="text-gray-600 text-sm mb-1">Розмір: {tire.size}</p>
                  <p className="text-gray-600 text-sm mb-1">Вісь: {tire.axle}</p>
                  <p className="text-gray-600 text-sm mb-1">Країна: {tire.country}</p>
                  <p className={`text-sm mb-2 ${tire.price ? 'text-green-600' : 'text-gray-500'}`}>
                    {tire.price ? 'В наявності' : 'Немає в наявності'}
                  </p>
                  <p className="text-blue-600 font-bold text-sm mb-4">
                    {tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}
                  </p>
                  {tire.price ? (
                    <button
                      onClick={() => addToCart(tire)}
                      className="button-pulse px-4 py-2 rounded text-sm mt-auto bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                    >
                      Додати в кошик
                    </button>
                  ) : (
                    <button
                      onClick={() => openModal(tire)}
                      className="button-pulse px-4 py-2 rounded text-sm mt-auto bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200"
                    >
                      Відправити запит
                    </button>
                  )}
                </div>
              ))}
              <div ref={observerRef} className="text-center py-4 col-span-full">
                {hasMore && <span className="text-gray-600 text-sm">Завантаження...</span>}
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="catalog-list mb-12 overflow-x-auto">
          {filteredTires.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">На жаль, нічого не знайдено</h3>
              <p className="text-gray-500 text-sm">Спробуйте змінити параметри фільтрів, щоб знайти потрібні шини.</p>
            </div>
          ) : (
            <>
              <table className="min-w-full bg-white border border-gray-200 rounded-lg">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Розмір</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Бренд</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Модель</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Вісь</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Ціна (безгот. з ПДВ)</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Країна</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700">Статус</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-gray-700"></th>
                  </tr>
                </thead>
                <tbody>
                  {displayedTires.map((tire, index) => (
                    <tr key={index} className="border-t border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">{tire.size}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{tire.brand}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{tire.model}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">{tire.axle}</td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {tire.price ? `${tire.price.toLocaleString()} грн` : 'Дізнайтесь у адміністрації'}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">{tire.country}</td>
                      <td className={`py-3 px-4 text-sm ${tire.price ? 'text-green-600' : 'text-gray-500'}`}>
                        {tire.price ? 'В наявності' : 'Немає в наявності'}
                      </td>
                      <td className="py-3 px-4">
                        {tire.price ? (
                          <button
                            onClick={() => addToCart(tire)}
                            className="button-pulse px-3 py-1 rounded text-sm bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
                          >
                            Додати
                          </button>
                        ) : (
                          <button
                            onClick={() => openModal(tire)}
                            className="button-pulse px-3 py-1 rounded text-sm bg-orange-600 text-white hover:bg-orange-700 transition-colors duration-200"
                          >
                            Відправити запит
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div ref={observerRef} className="text-center py-4">
                {hasMore && <span className="text-gray-600 text-sm">Завантаження...</span>}
              </div>
            </>
          )}
        </div>
      )}

      {showScrollToTop && <ScrollToTopArrow onClick={scrollToTop} />}
    </div>
  );
}