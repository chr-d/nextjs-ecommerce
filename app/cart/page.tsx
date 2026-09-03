import CartList from "@/components/CartList";
import { getProducts } from "@/lib/api";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "amooozon - Your Cart",
  description: "See all products in your shopping cart",
};

export default async function Cart() {
  const products = await getProducts();
  return <CartList products={products} />;
}
