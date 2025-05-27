'use client';

import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    // Завантажуємо кошик із localStorage при ініціалізації
    const savedCart = typeof window !== 'undefined' ? localStorage.getItem('cart') : null;
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // Зберігаємо кошик у localStorage при кожній зміні
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart]);

  const addToCart = (tire) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.tire.brand === tire.brand && item.tire.model === tire.model);
      if (existingItem) {
        return prev.map((item) =>
          item.tire.brand === tire.brand && item.tire.model === tire.model
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { tire, quantity: 1 }];
    });
  };

  const removeFromCart = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index, newQuantity) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const totalCartPrice = cart.reduce(
    (sum, item) => sum + (item.tire.price || 0) * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, updateQuantity, totalCartPrice, totalItems }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}