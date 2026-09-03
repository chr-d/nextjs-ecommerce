import ProductCard from "@/components/ProductCard";
import { getProductsByCategory, type Product } from "@/lib/api";
import { Metadata } from "next";
import { notFound } from "next/navigation";

function capitalizeWords(str: string) {
  return str.replace(/(^|\s)\S/g, (char) => char.toUpperCase());
}

export async function generateMetadata({
  params,
}: PageProps<"/category/[category]">): Promise<Metadata> {
  const { category } = await params;

  return {
    title: `amooozon - ${capitalizeWords(decodeURIComponent(category))}`,
    description: `Browse all products in the ${decodeURIComponent(category)} category`,
  };
}

export default async function Category({
  params,
}: PageProps<"/category/[category]">) {
  const { category } = await params;

  let products: Product[] = [];
  try {
    products = await getProductsByCategory(category);
  } catch {}

  if (products.length === 0) {
    notFound();
  }

  return (
    <div className="flex flex-col items-center">
      <h2 className="my-4 text-2xl capitalize">
        {decodeURIComponent(category)}
      </h2>
      <div className="flex flex-wrap justify-center gap-4">
        {products?.map((item) => (
          <ProductCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
