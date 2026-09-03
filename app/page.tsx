import ProductCard from "@/components/ProductCard";
import { getCategories, getProducts } from "@/lib/api";
import { Route } from "next";
import Link from "next/link";

export default async function Home() {
  const [categories, products] = await Promise.all([
    getCategories(),
    getProducts(),
  ]);

  return (
    <div className="mt-4 flex flex-col items-center">
      <ul className="menu menu-horizontal">
        {categories?.map((category, index) => (
          <li className="bg-base-300 mx-2 capitalize" key={index}>
            <Link href={`/category/${category}` as Route}>{category}</Link>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {products?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
