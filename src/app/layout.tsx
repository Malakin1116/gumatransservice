import type { Metadata } from 'next';
import './globals.css';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'ТОВ ГУМАТРАНССЕРВІС - Каталог шин і дисків',
  description: 'Широкий вибір шин і дисків для вантажних авто в Києві. Професійний шиномонтаж.',
  keywords: 'шини, диски, шиномонтаж, Київ, ГУМАТРАНССЕРВІС',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="uk">
      <body className="antialiased bg-gray-50">
        <header className="bg-blue-900 text-white sticky top-0 z-10">
          <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold">ТОВ "ГУМАТРАНССЕРВІС"</h1>
            <nav className="space-x-4">
              <Link href="/" className="hover:underline">Головна</Link>
              <Link href="/catalog" className="underline">Каталог</Link>
              <Link href="/services" className="hover:underline">Послуги</Link>
              <Link href="/contacts" className="hover:underline">Контакти</Link>
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="bg-blue-900 text-white py-6">
          <div className="max-w-7xl mx-auto px-4 text-center">
            <p>ТОВ "ГУМАТРАНССЕРВІС" © 2025. Всі права захищено.</p>
            <p>м. Київ, вул. Авторемонтна, 10 | +380 (50) 123-45-67</p>
          </div>
        </footer>
      </body>
    </html>
  );
}