import CartList from "@/components/CartList";
import { getProducts } from "@/lib/api";

export const dynamic = "force-dynamic";

export default async function Cart() {
  const products = await getProducts();
  return <CartList products={products} />;
}
