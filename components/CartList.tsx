"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/api";
import { getCartItemsDetails } from "@/lib/cart";
import { formatCurrency } from "@/lib/formatCurrency";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function CartList() {
  const { items, isInitialized, add, remove, clear } = useCart();
  const [cartDetails, setCartDetails] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (!isInitialized) return;

    if (Object.keys(items).length === 0) {
      setIsLoading(false);
      return;
    }

    const fetchItems = async () => {
      if (hasFetched.current || Object.keys(items).length === 0) return;

      hasFetched.current = true;
      try {
        const results = await getCartItemsDetails(items);
        setCartDetails(results);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, [isInitialized, items]);

  const cartEntries = Object.entries(items)
    .map(([id, amount]) => {
      const product = cartDetails.find((p) => p.id === Number(id));
      return { product, amount };
    })
    .filter(
      (cartEntry): cartEntry is { product: Product; amount: number } =>
        cartEntry.product !== undefined,
    );

  const total = cartEntries.reduce((sum, cartEntry) => {
    return sum + cartEntry.product!.price * cartEntry.amount;
  }, 0);

  if (!isInitialized || (Object.keys(items).length > 0 && isLoading)) {
    return (
      <div className="mx-8 mt-8">
        <ul className="list bg-base-200 rounded-box shadow-md">
          <li className="p-4 pb-2 text-xl tracking-wide opacity-60">
            <span className="skeleton skeleton-text">Loading Cart...</span>
          </li>
        </ul>
      </div>
    );
  }

  return (
    <div className="mx-8 mt-8">
      <ul className="list bg-base-200 rounded-box shadow-md">
        <li className="p-4 pb-2 text-xl tracking-wide opacity-60">
          Items in your cart
        </li>

        {cartEntries.length === 0 && (
          <li className="p-4 opacity-60">Your cart is empty.</li>
        )}

        {cartEntries.map(({ product, amount }) => (
          <li className="md:list-row my-4 md:my-0 px-4" key={product.id}>
            <div className="flex size-20 justify-center bg-white p-2">
              <Image
                className="h-full w-auto object-contain"
                alt={product.title}
                src={product.image}
                width={80}
                height={80}
                loading="lazy"
              />
            </div>
            <div>
              <div>{product.title}</div>
              <div className="text-xs font-semibold opacity-60">
                Unit price: {formatCurrency(product.price)}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="btn btn-primary btn-square"
                aria-label="Remove from cart"
                onClick={() => remove(product.id)}
              >
                -
              </button>
              <span className="text-xl min-w-6 text-center">{amount}</span>
              <button
                className="btn btn-primary btn-square"
                aria-label="Add to cart"
                onClick={() => add(product.id)}
              >
                +
              </button>
              <span className="text-xl min-w-28 text-right">
                {formatCurrency(product.price * amount)}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="p-4 text-right text-xl">TOTAL: {formatCurrency(total)}</p>
      <div className="flex justify-end gap-4">
        <button className="btn btn-error" onClick={clear}>
          Clear cart
        </button>
        <button className="btn btn-info">Buy now</button>
      </div>
    </div>
  );
}
