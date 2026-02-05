import { formatLabel } from "../Features/products/helpers/labelFormatter";
import type {
  GetProductsParams,
  Product,
  ProductsResponse,
} from "../Features/products/types/product";
import { supabase } from "./supabase";

/**
 * Gets a list of products with filtering, sorting and pagination.
 */
export async function getProducts({
  filter,
  sortBy,
  page,
  pageSize = 12,
}: GetProductsParams): Promise<ProductsResponse> {
  let query = supabase.from("products").select("*", { count: "exact" });

  /* Filtering */
  if (filter.genre && filter.genre !== "all") {
    query = query.contains("genre", JSON.stringify([filter.genre]));
  }

  if (filter.platform && filter.platform !== "all") {
    query = query.contains("platforms", JSON.stringify([filter.platform]));
  }

  /* Boolean flags */
  if (filter.isTrending !== null && filter.isTrending !== undefined)
    query = query.eq("is_trending", filter.isTrending);
  if (filter.isRecommended !== null && filter.isRecommended !== undefined)
    query = query.eq("is_recommended", filter.isRecommended);
  if (filter.isBestseller !== null && filter.isBestseller !== undefined)
    query = query.eq("is_bestseller", filter.isBestseller);

  /* Price */
  if (filter.minPrice) query = query.gte("price", filter.minPrice);
  if (filter.maxPrice) query = query.lte("price", filter.maxPrice);

  /* SORT */
  if (sortBy && sortBy.field) {
    query = query.order(sortBy.field as string, {
      ascending: sortBy.direction === "asc",
    });
  }

  /* Pagination */

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Couldn't load the games list!");
  }
  return { data, count };
}

/**
 *
 */

export async function searchProducts(
  debouncedQuery: string,
): Promise<Product[]> {
  if (!debouncedQuery || debouncedQuery.trim().length < 3) return [];
  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, price, original_price, image")
    .ilike("title", `%${debouncedQuery}%`)
    .limit(10);

  if (error) {
    console.error(error);
    throw new Error("Search error");
  }

  return (data as unknown as Product[]) || [];
}

export async function getProduct(slug: string): Promise<Product> {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product not found!");
  }

  return data;
}

/**
 * Gets current stock and price (for cart verificatino).
 */
export async function getProductStockAndPrice(
  id: string | number,
): Promise<Pick<Product, "in_stock" | "price">> {
  const { data, error } = await supabase
    .from("products")
    .select("in_stock, price")
    .eq("id", String(id))
    .single();
  if (error) throw new Error("Could not verify stock status");
  return data;
}

/**
 * Gets avaliable filter options from db
 */
export async function getFilterOptions(): Promise<{
  genres: { value: string; name: string }[];
  platforms: { value: string; name: string }[];
}> {
  const { data: genres, error: genreError } = await supabase
    .from("unique_genres")
    .select("name");
  const { data: platforms, error: platError } = await supabase
    .from("unique_platforms")
    .select("name");

  if (genreError || platError) throw new Error("Could not load filter options");

  return {
    genres: (genres || []).map((g: any) => ({
      value: g.name.toLowerCase(),
      name: formatLabel(g.name),
    })),
    platforms: (platforms || []).map((p: any) => ({
      value: p.name.toLowerCase(),
      name: formatLabel(p.name),
    })),
  };
}
