import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon';
import MobileNav from './components/MobileNav';

export const metadata: Metadata = {
  title: 'TIR Шиномонтаж та Шини в Борисполі, Гурівщині, Броварах, Києві',
  description: 'Купити шини для вантажівок і TIR шиномонтаж у Борисполі (Бориспільська окружна), Гурівщині (вул. Київська, 100/1), Броварах, Києві. Якісні шини від ГУМАТРАНССЕРВІС.',
  keywords: 'TIR шиномонтаж, купити шини на вантажівки, шини для TIR, шиномонтаж Бориспіль, шиномонтаж Гурівщина, шиномонтаж Бровари, шиномонтаж Київ, вантажні шини, диски для вантажівок, ГУМАТРАНССЕРВІС, Київська область',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const boryspilMapLink = "https://maps.app.goo.gl/pSPjEEWP8pi4Y4jZA";
  const hurivshchynaMapLink = "https://maps.app.goo.gl/6f1imretRviTXtJF7";

  return (
    <html lang="uk">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body className="antialiased bg-gray-50">
        <CartProvider>
          <div className="page-container">
            <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white sticky top-0 z-20 shadow-lg">
              <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <Link href="/">
                  <h1 className="text-xl sm:text-2xl font-bold hover:underline flex items-center animate-fade-in">
                    ТОВ "ГУМАТРАНССЕРВІС"
                  </h1>
                </Link>
                <div className="flex items-center gap-4">
                  <MobileNav />
                  <nav className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:underline text-base font-medium flex items-center animate-fade-in delay-100">
                      <svg className="w-5 h-5 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      Головна
                    </Link>
                    <Link href="/catalog" className="hover:underline text-base font-medium flex items-center animate-fade-in delay-200">
                      <svg className="w-5 h-5 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                      Каталог
                    </Link>
                    <Link href="/services" className="hover:underline text-base font-medium flex items-center animate-fade-in delay-300">
                      <svg className="w-5 h-5 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      Послуги
                    </Link>
                    <Link href="/contacts" className="hover:underline text-base font-medium flex items-center animate-fade-in delay-400">
                      <svg className="w-5 h-5 mr-1 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      Контакти
                    </Link>
                  </nav>
                  <CartIcon />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="mb-2">ТОВ "ГУМАТРАНССЕРВІС" © 2025. Всі права захищено.</p>
                <p>
                  <a href={boryspilMapLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    вул. Об'їзна, Бориспільська окружна, Київська область, 08320
                  </a> |{' '}
                  <a href={hurivshchynaMapLink} target="_blank" rel="noopener noreferrer" className="hover:underline">
                    вул. Київська, 100/1, Гурівщина, Київська область, 08124
                  </a> |{' '}
                  <a href="tel:+380672399689" className="hover:underline">+380 (67) 239-96-89</a>
                </p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}