import z from "zod";

const API_BASE_URL = "https://fakestoreapi.com";

const ProductSchema = z.object({
  id: z.number(),
  title: z.string(),
  price: z.number(),
  description: z.string(),
  category: z.string(),
  image: z.string(),
  rating: z.object({ rate: z.number(), count: z.number() }),
});

const CategorySchema = z.string();

const ProductsSchema = z.array(ProductSchema);
const CategoriesSchema = z.array(CategorySchema);

export type Product = z.infer<typeof ProductSchema>;
export type Category = z.infer<typeof CategorySchema>;

export async function getCategories() {
  const res = await fetch(`${API_BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return CategoriesSchema.parse(await res.json());
}

export async function getProducts() {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return ProductsSchema.parse(await res.json());
}

export async function getProductsByCategory(category: string) {
  const res = await fetch(`${API_BASE_URL}/products/category/${category}`);
  if (!res.ok) throw new Error(`API Error ${res.status}: ${res.statusText}`);
  return ProductsSchema.parse(await res.json());
}
