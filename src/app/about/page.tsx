'use client';

import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function About() {
  return (
    <>
      <NextSeo
        title="Про нас | ГУМАТРАНССЕРВІС"
        description="Дізнайтесь більше про ГУМАТРАНССЕРВІС – вашого надійного постачальника шин та камер для вантажних автомобілів. Контакти, історія, наші переваги."
        canonical="https://gumatransservice.com/about"
        openGraph={{
          url: 'https://gumatransservice.com/about',
          title: 'Про нас | ГУМАТРАНССЕРВІС',
          description: 'Дізнайтесь більше про ГУМАТРАНССЕРВІС – вашого надійного постачальника шин та камер для вантажних автомобілів. Контакти, історія, наші переваги.',
          images: [
            {
              url: 'https://gumatransservice.com/images/about-og-image.jpg',
              width: 1200,
              height: 630,
              alt: 'Про нас - ГУМАТРАНССЕРВІС',
            },
          ],
          site_name: 'ГУМАТРАНССЕРВІС',
        }}
        twitter={{
          handle: '@yourhandle',
          site: '@yourhandle',
          cardType: 'summary_large_image',
        }}
      />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Про нас</h1>
        <p className="text-lg text-gray-600 mb-4">
          ТОВ "ГУМАТРАНССЕРВІС" – це ваш надійний партнер у сфері постачання шин та камер для вантажних автомобілів. Ми працюємо на ринку України понад 10 років, забезпечуючи наших клієнтів якісною продукцією від провідних світових брендів.
        </p>
        <p className="text-lg text-gray-600 mb-12">
          Наша місія – забезпечити безпеку та комфорт на дорогах, пропонуючи шини, які відповідають найвищим стандартам якості. Ми пропонуємо широкий асортимент, конкурентні ціни та швидку доставку по всій Україні.
        </p>

        {/* Контактна інформація та карта */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Наші контакти</h2>
            <p className="text-gray-600 mb-2"><strong>Адреса:</strong> вул. Об'їзна, м. Бориспіль, Київська область, 08320</p>
            <p className="text-gray-600 mb-2"><strong>Телефон:</strong> +380 (67) 239-96-89</p>
            <p className="text-gray-600 mb-2"><strong>Email:</strong> info@humatransservice.com.ua</p>
            <p className="text-gray-600 mb-2"><strong>Графік роботи:</strong></p>
            <ul className="text-gray-600 list-disc list-inside">
              <li>Понеділок: 08:00–20:00</li>
              <li>Вівторок: 08:00–20:00</li>
              <li>Середа: 08:00–20:00</li>
              <li>Четвер: 08:00–20:00</li>
              <li>П’ятниця: 08:00–20:00</li>
              <li>Субота: 08:00–20:00</li>
              <li>Неділя: 08:00–20:00</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-semibold mb-4">Ми на карті</h2>
            <div className="w-full h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2542.876!2d30.8545587!3d50.416733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTAuNDE2NzMzLDMwLjg1Njc0Nw!5e0!3m2!1sen!2sua!4v1697051234567"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                title="Карта ТОВ ГУМАТРАНССЕРВІС"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Швидкі посилання */}
        <div className="text-center">
          <p className="text-lg mb-4">Дізнайтесь більше про наші послуги або перегляньте каталог!</p>
          <div className="flex justify-center gap-4">
            <Link href="/catalog" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700">
              Каталог шин
            </Link>
            <Link href="/services" className="bg-transparent border-2 border-blue-600 text-blue-600 px-6 py-3 rounded hover:bg-blue-600 hover:text-white">
              Послуги
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}