"use server";

import { getProductById } from "@/lib/api";

export async function getCartItemsDetails(items: Record<string, number>) {
  const itemIds = Object.keys(items);
  const fetchPromises = itemIds.map((id) => getProductById(id));
  const results = await Promise.all(fetchPromises);
  return results;
}
