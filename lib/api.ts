"use server";

import z from "zod";

const API_BASE_URL = "https://fakestoreapi.com";

const productSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({ rate: z.number(), count: z.number() }),
});
const categorySchema = z.string();
const productsSchema = z.array(productSchema);
const categoriesSchema = z.array(categorySchema);

export type Product = z.infer<typeof productSchema>;
export type Category = z.infer<typeof categorySchema>;

export async function getCategories(): Promise<Category[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return categoriesSchema.parse(await res.json());
}

export async function getProducts(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return productsSchema.parse(await res.json());
}

export async function getProductsByCategory(
  category: string,
): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return productsSchema.parse(await res.json());
}

export async function getProductById(id: string): Promise<Product> {
  const res = await fetch(`${API_BASE_URL}/products/${id}`, {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return productSchema.parse(await res.json());
}
