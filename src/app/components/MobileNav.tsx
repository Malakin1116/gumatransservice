'use client';

import Link from 'next/link';

export default function MobileNav() {
  const toggleMenu = () => {
    document.getElementById('nav-menu')?.classList.toggle('hidden');
  };

  return (
    <div className="flex items-center gap-4">
      <button
        className="md:hidden p-2 rounded bg-blue-700 hover:bg-blue-800"
        onClick={toggleMenu}
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <nav id="nav-menu" className="nav-menu hidden md:hidden">
        <div className="flex flex-col space-y-2">
          <Link href="/" className="nav-menu-item" onClick={toggleMenu}>Головна</Link>
          <Link href="/catalog" className="nav-menu-item" onClick={toggleMenu}>Каталог</Link>
          <Link href="/services" className="nav-menu-item" onClick={toggleMenu}>Послуги</Link>
          <Link href="/contacts" className="nav-menu-item" onClick={toggleMenu}>Контакти</Link>
        </div>
      </nav>
    </div>
  );
}