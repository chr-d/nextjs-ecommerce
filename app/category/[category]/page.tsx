import ProductCard from "@/components/ProductCard";
import { getProductsByCategory } from "@/lib/api";

export default async function Category({
  params,
}: PageProps<"/category/[category]">) {
  const { category } = await params;
  const products = await getProductsByCategory(category);
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
