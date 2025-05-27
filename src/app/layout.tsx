import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';
import { CartProvider } from './context/CartContext';
import CartIcon from './components/CartIcon';
import MobileNav from './components/MobileNav';

export const metadata: Metadata = {
  title: 'ТОВ ГУМАТРАНССЕРВІС - Каталог шин і дисків',
  description: 'Широкий вибір шин і дисків для вантажних авто в Борисполі. Професійний шиномонтаж.',
  keywords: 'шини, диски, шиномонтаж, Бориспіль, Київська область, ГУМАТРАНССЕРВІС',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" />
      </head>
      <body className="antialiased bg-gray-50">
        <CartProvider>
          <div className="page-container">
            <header className="bg-blue-900 text-white sticky top-0 z-20">
              <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
                <h1 className="text-xl sm:text-2xl font-bold">ТОВ "ГУМАТРАНССЕРВІС"</h1>
                <div className="flex items-center gap-4">
                  <MobileNav />
                  <nav className="hidden md:flex space-x-4">
                    <Link href="/" className="hover:underline text-base font-medium">Головна</Link>
                    <Link href="/catalog" className="hover:underline text-base font-medium">Каталог</Link>
                    <Link href="/services" className="hover:underline text-base font-medium">Послуги</Link>
                    <Link href="/contacts" className="hover:underline text-base font-medium">Контакти</Link>
                  </nav>
                  <CartIcon />
                </div>
              </div>
            </header>
            <main className="flex-1">{children}</main>
            <footer className="bg-blue-900 text-white py-6">
              <div className="max-w-7xl mx-auto px-4 text-center">
                <p>ТОВ "ГУМАТРАНССЕРВІС" © 2025. Всі права захищено.</p>
                <p>вул. Об'їзна, м. Бориспіль, Київська область, 08320 | +380 (67) 239-96-89</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </body>
    </html>
  );
}