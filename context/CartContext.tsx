"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import z from "zod";

const cartSchema = z.record(z.string(), z.number().int().positive());
export type Cart = z.infer<typeof cartSchema>;
const STORAGE_KEY = "cart";

type CartContextValue = {
  items: Cart;
  add: (productId: number) => void;
  remove: (productId: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

function readCart(): Cart {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return {};
    return cartSchema.parse(JSON.parse(data));
  } catch {
    return {};
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Cart>({});
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setItems(readCart());
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    }
  }, [items, isInitialized]);

  const add = (productId: number) => {
    setItems((prev) => ({ ...prev, [productId]: (prev[productId] ?? 0) + 1 }));
  };

  const remove = (productId: number) => {
    setItems((prev) => {
      const amount = (prev[productId] ?? 0) - 1;
      if (amount <= 0) {
        const next = { ...prev };
        delete next[productId];
        return next;
      }
      return { ...prev, [productId]: amount };
    });
  };

  const clear = () => setItems({});

  const value = { items, add, remove, clear };

  return <CartContext value={value}>{children}</CartContext>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within <CartProvider>");
  return context;
}
