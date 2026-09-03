"use client";

import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/api";
import { formatCurrency } from "@/lib/formatCurrency";

export default function CartList({ products }: { products: Product[] }) {
  const { items, add, remove, clear } = useCart();

  const cartEntries = Object.entries(items)
    .map(([id, amount]) => {
      const product = products.find((p) => p.id === Number(id));
      return { product, amount };
    })
    .filter(
      (cartEntry): cartEntry is { product: Product; amount: number } =>
        cartEntry.product !== undefined,
    );

  const total = cartEntries.reduce((sum, cartEntry) => {
    return sum + cartEntry.product!.price * cartEntry.amount;
  }, 0);

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
          <li className="md:list-row" key={product.id}>
            <div className="flex size-20 justify-center bg-white p-2">
              <img
                className="h-full"
                alt={product.title}
                src={product.image}
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
                onClick={() => remove(product.id)}
              >
                -
              </button>
              <span className="text-xl min-w-6 text-center">{amount}</span>
              <button
                className="btn btn-primary btn-square"
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
