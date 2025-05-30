import Link from 'next/link';

export const dynamic = 'force-dynamic'; // Додано

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 text-center">
      <h1 className="text-4xl font-bold mb-6">Ласкаво просимо до ТОВ "ГУМАТРАНССЕРВІС"</h1>
      <p className="text-lg mb-8">Широкий вибір шин і дисків для вантажних авто. Професійний шиномонтаж у Києві.</p>
      <Link href="/catalog" className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block">
        Переглянути каталог
      </Link>
    </div>
  );
}