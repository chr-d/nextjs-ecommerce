"use server";

import { getProductById, type Product } from "@/lib/api";

export async function getCartItemsDetails(
  items: Record<string, number>,
): Promise<Product[]> {
  const itemIds = Object.keys(items);
  const fetchPromises = itemIds.map((id) => getProductById(id));
  return Promise.all(fetchPromises);
}
