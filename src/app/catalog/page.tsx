'use client';

import Head from 'next/head';
import Link from 'next/link';

export default function Catalog() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <Head>
        <title>Каталог шин і дисків | Назва сайту</title>
        <meta name="description" content="Ознайомтеся з нашим каталогом вантажних шин і дисків. Широкий вибір за вигідними цінами." />
        <meta name="keywords" content="вантажні шини, диски, каталог шин, купити шини, купити диски" />
      </Head>
      <h1 className="text-3xl font-bold mb-6">Каталог</h1>
      <div className="flex flex-col gap-4">
        <Link href="/catalog/tires" className="text-blue-600 hover:underline text-lg">
          Перейти до каталогу шин
        </Link>
        <Link href="/catalog/disks" className="text-blue-600 hover:underline text-lg">
          Перейти до каталогу дисків
        </Link>
      </div>
    </div>
  );
}