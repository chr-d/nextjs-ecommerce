import CardCartButtons from "@/components/CardCartButtons";
import type { Product } from "@/lib/api";
import { formatCurrency } from "@/lib/formatCurrency";
import type { Route } from "next";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <div className="card bg-base-200 w-96 shadow-sm">
      <figure className="bg-white p-4 h-48">
        <Image
          className="h-full w-auto object-contain"
          src={item.image}
          alt={item.title}
          width={200}
          height={200}
          loading="lazy"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{item.title}</h2>
        <p className="truncate">{item.description}</p>
        <div className="badge badge-secondary badge-outline text-xs capitalize">
          <Link href={`/category/${item.category}` as Route}>
            {item.category}
          </Link>
        </div>
        <div className="card-actions justify-end">
          <span className="self-center text-xl">
            {formatCurrency(item.price)}
          </span>
          <CardCartButtons itemId={item.id} />
        </div>
      </div>
    </div>
  );
}
