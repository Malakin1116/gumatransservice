'use client';

import { useCart } from '../context/CartContext';
import Link from 'next/link';
import TirePlaceholderSVG from '../components/TirePlaceholderSVG';

interface Tire {
  size: string;
  brand: string;
  model: string;
  axle: string;
  price: number | null;
  country: string;
  type?: string;
}

interface CartItem {
  tire: Tire;
  quantity: number;
}

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, totalCartPrice } = useCart();

  const handleQuantityChange = (index: number, value: string) => {
    const newQuantity = parseInt(value);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(index, newQuantity);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Кошик</h1>
      {cart.length === 0 ? (
        <div className="empty-cart text-center py-12 bg-white rounded-lg shadow-md">
          <svg
            className="w-24 h-24 mx-auto mb-4 text-gray-400 animate-bounce-slow"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <p className="text-gray-600 text-lg mb-4">Ваш кошик порожній</p>
          <p className="text-gray-500 text-sm mb-6">Додайте шини чи диски з нашого каталогу, щоб продовжити!</p>
          <Link
            href="/catalog"
            className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full hover:bg-blue-700 transition-transform transform hover:scale-105"
          >
            Перейти до каталогу
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="catalog-grid gap-4 mb-12">
            {cart.map((item: CartItem, index: number) => {
              const itemTotal = item.tire.price ? item.tire.price * item.quantity : null;
              return (
                <div key={index} className="catalog-card card-hover">
                  <TirePlaceholderSVG className="w-full h-32 object-cover rounded mb-4" />
                  <h3 className="text-base font-semibold mb-2">{item.tire.brand} {item.tire.model}</h3>
                  <p className="text-gray-600 text-sm mb-1">Тип: {item.tire.type || 'Шина'}</p>
                  <p className="text-gray-600 text-sm mb-1">Розмір: {item.tire.size}</p>
                  <p className="text-gray-600 text-sm mb-1">Вісь: {item.tire.axle || '-'}</p>
                  <p className="text-gray-600 text-sm mb-2">Країна: {item.tire.country}</p>
                  <p className="text-blue-600 font-bold text-sm mb-2">
                    {item.tire.price ? `${item.tire.price.toLocaleString()} грн/шт` : 'Ціна за запитом'}
                  </p>
                  {item.quantity !== 1 && itemTotal && (
                    <p className="text-gray-800 font-semibold text-sm mb-2">
                      Сума: {itemTotal.toLocaleString()} грн
                    </p>
                  )}
                  <div className="flex items-center gap-2 mb-4">
                    <button
                      onClick={() => updateQuantity(index, item.quantity - 1)}
                      className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                      className="w-12 p-1 border rounded text-sm text-center no-spinner"
                      min="1"
                    />
                    <button
                      onClick={() => updateQuantity(index, item.quantity + 1)}
                      className="bg-gray-200 px-3 py-1 rounded text-sm hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => removeFromCart(index)}
                    className="button-pulse bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 text-sm mt-auto"
                  >
                    Видалити
                  </button>
                </div>
              );
            })}
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-end">
            <p className="cart-total">Разом: {totalCartPrice.toLocaleString()} грн</p>
            <Link
              href="/checkout"
              className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 inline-block"
            >
              Оформити замовлення
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}