import CartList from "@/components/CartList";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "amooozon - Your Cart",
  description: "See all products in your shopping cart",
};

export default async function Cart() {
  return <CartList />;
}
