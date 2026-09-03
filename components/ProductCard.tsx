"use client";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/api";
import { formatCurrency } from "@/lib/formatCurrency";
import { Route } from "next";
import Link from "next/link";

export default function ProductCard({ item }: { item: Product }) {
  const { items, add, remove } = useCart();
  const amount = items[item.id] ?? 0;

  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="bg-white p-4 h-48">
        <img
          className="h-full"
          src={item.image}
          alt={item.title}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="truncate">{item.description}</p>
        <div className="badge badge-outline text-xs capitalize">
          <Link href={`/category/${item.category}` as Route}>
            {item.category}
          </Link>
        </div>
        <div className="card-actions justify-end">
          <span className="self-center text-xl">
            {formatCurrency(item.price)}
          </span>

          {amount === 0 ? (
            <button className="btn btn-primary" onClick={() => add(item.id)}>
              Add to cart
            </button>
          ) : (
            <>
              <button
                className="btn btn-primary"
                onClick={() => remove(item.id)}
              >
                -
              </button>
              <span className="self-center text-xl">{amount}</span>
              <button className="btn btn-primary" onClick={() => add(item.id)}>
                +
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
