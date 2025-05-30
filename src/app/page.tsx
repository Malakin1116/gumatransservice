import Link from 'next/link';
import tiresData from '../../data/tires.json';
import disksData from '../../data/disks.json';
import TirePlaceholderSVG from '../app/components/TirePlaceholderSVG';
import DiskPlaceholderSVG from '../app/components/DiskPlaceholderSVG';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
}

interface Disk {
  size: string;
  brand: string;
  price: number | null;
  country: string;
}

interface PopularItem {
  size: string;
  brand: string;
  price: number;
  country: string;
  isDisk: boolean;
  model?: string;
  axle?: string;
}

export default function Home() {
  const popularItems: PopularItem[] = [
    ...tiresData
      .filter((item: Tire): item is Tire & { price: number } => item.price !== null)
      .slice(0, 2)
      .map((item: Tire & { price: number }) => ({
        size: item.size,
        brand: item.brand,
        price: item.price,
        country: item.country,
        isDisk: false,
        model: item.model,
        axle: item.axle,
      })),
    ...disksData
      .filter((item: Disk): item is Disk & { price: number } => item.price !== null)
      .slice(0, 1)
      .map((item: Disk & { price: number }) => ({
        size: item.size,
        brand: item.brand,
        price: item.price,
        country: item.country,
        isDisk: true,
      })),
  ];

  return (
    <div className="bg-gray-50">
      <section className="relative py-24 text-white overflow-hidden">
        <svg
          className="absolute inset-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            <linearGradient id="heroGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" style={{ stopColor: 'rgba(2, 132, 199, 0.85)', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: 'rgba(59, 130, 246, 0.65)', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#heroGradient)" />
          <rect
            width="100%"
            height="100%"
            fill="url(#heroGradient)"
            className="animate-pulse opacity-30"
          />
          <circle
            cx="50%"
            cy="50%"
            r="40%"
            fill="none"
            stroke="white"
            strokeWidth="0.5"
            strokeDasharray="10 10"
            className="opacity-10"
          />
        </svg>
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 animate-fade-in">
            ТОВ "ГУМАТРАНССЕРВІС"
          </h1>
          <p className="text-xl md:text-2xl mb-8 animate-fade-in delay-200">
            Потужні шини та професійний шиномонтаж для ваших вантажівок!
          </p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog/tires"
              className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition-transform transform hover:scale-110 hover:shadow-2xl animate-bounce-in"
            >
              Каталог шин
            </Link>
            <Link
              href="/services"
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-900 transition-transform transform hover:scale-110 hover:shadow-2xl animate-bounce-in delay-100"
            >
              Послуги
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
      </section>

      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-900">Наші бестселери</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {popularItems.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">На жаль, бестселери тимчасово недоступні</h3>
              <p className="text-gray-500 text-sm">Перегляньте наш каталог для інших пропозицій!</p>
            </div>
          ) : (
            popularItems.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow-lg p-6 text-center transform transition-transform duration-500 hover:scale-105 animate-slide-in"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                {item.isDisk ? (
                  <DiskPlaceholderSVG className="w-24 h-24 mx-auto mb-4" />
                ) : (
                  <TirePlaceholderSVG className="w-24 h-24 mx-auto mb-4" />
                )}
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {item.brand} {!item.isDisk && item.model ? item.model : ''}
                </h3>
                <p className="text-gray-600 mb-2">Розмір: {item.size}</p>
                <p className="text-gray-600 mb-2">Тип: {item.isDisk ? 'Диск' : 'Шина'}</p>
                <p className="text-blue-600 font-bold mb-4">{item.price.toLocaleString()} грн</p>
                <Link
                  href={item.isDisk ? '/catalog/disks' : '/catalog/tires'}
                  className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
                >
                  Детальніше
                </Link>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="bg-blue-900 text-white py-12 text-center">
        <div className="max-w-7xl mx-auto px-4">
          <h3 className="text-2xl font-bold mb-4">Потрібні шини чи шиномонтаж?</h3>
          <p className="text-lg mb-6">Перегляньте наш каталог</p>
          <div className="flex justify-center gap-4">
            <Link
              href="/catalog/tires"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors duration-300"
            >
              Каталог шин
            </Link>
            <Link
              href="/services"
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300"
            >
              Запис на шиномонтаж
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}