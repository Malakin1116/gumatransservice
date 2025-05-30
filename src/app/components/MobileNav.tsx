'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="flex items-center">
      <button
        className="md:hidden p-2 rounded bg-blue-600 hover:bg-blue-700"
        onClick={toggleMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav className={`nav-menu-mobile ${isOpen ? 'block' : 'hidden'} md:hidden absolute top-16 left-0 w-full bg-blue-800 text-white z-10`}>
        <div className="flex flex-col space-y-2 p-4">
          <Link href="/" className="nav-menu-item hover:bg-blue-700 p-2 rounded" onClick={toggleMenu}>
            Головна
          </Link>
          <Link href="/catalog" className="nav-menu-item hover:bg-blue-700 p-2 rounded" onClick={toggleMenu}>
            Каталог
          </Link>
          <Link href="/services" className="nav-menu-item hover:bg-blue-700 p-2 rounded" onClick={toggleMenu}>
            Послуги
          </Link>
          <Link href="/contacts" className="nav-menu-item hover:bg-blue-700 p-2 rounded" onClick={toggleMenu}>
            Контакти
          </Link>
        </div>
      </nav>
    </div>
  );
}