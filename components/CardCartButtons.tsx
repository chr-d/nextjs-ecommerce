"use client";

import { useCart } from "@/context/CartContext";

export default function CardCartButtons({ itemId }: { itemId: number }) {
  const { items, isInitialized, add, remove } = useCart();
  const amount = items[itemId] ?? 0;
  if (!isInitialized) return <div className="skeleton w-30 h-10"></div>;
  return amount === 0 ? (
    <button className="btn btn-primary" onClick={() => add(itemId)}>
      Add to cart
    </button>
  ) : (
    <>
      <button
        className="btn btn-primary"
        aria-label="Remove from cart"
        onClick={() => remove(itemId)}
      >
        -
      </button>
      <span className="self-center text-xl min-w-6 text-center">{amount}</span>
      <button
        className="btn btn-primary"
        aria-label="Add to cart"
        onClick={() => add(itemId)}
      >
        +
      </button>
    </>
  );
}
