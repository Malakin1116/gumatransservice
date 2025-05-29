'use client';

import { createContext, useContext, useState, useEffect } from 'react';

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

interface CartContextType {
  cart: CartItem[];
  addToCart: (tire: Tire) => void;
  removeFromCart: (index: number) => void;
  updateQuantity: (index: number, newQuantity: number) => void;
  clearCart: () => void;
  totalCartPrice: number;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    if (isMounted) {
      localStorage.setItem('cart', JSON.stringify(cart));
    }
  }, [cart, isMounted]);

  const addToCart = (tire: Tire) => {
    setCart((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.tire.brand === tire.brand &&
          item.tire.model === tire.model &&
          item.tire.size === tire.size &&
          item.tire.axle === tire.axle
      );
      if (existingItem) {
        return prev.map((item) =>
          item.tire.brand === tire.brand &&
          item.tire.model === tire.model &&
          item.tire.size === tire.size &&
          item.tire.axle === tire.axle
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { tire, quantity: 1 }];
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const updateQuantity = (index: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCart((prev) =>
      prev.map((item, i) => (i === index ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem('cart');
  };

  const totalCartPrice = cart.reduce(
    (sum, item) => sum + (item.tire.price || 0) * item.quantity,
    0
  );

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (!isMounted) {
    return <>{children}</>;
  }

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, totalCartPrice, totalItems }}
    >
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