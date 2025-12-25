import { supabase } from "./supabase";

export async function getProducts({ filter, sortBy, page, pageSize = 12 }) {
  let query = supabase.from("products").select("*", { count: "exact" });

  if (filter.genre && filter.genre !== "all") {
    query = query.contains("genre", JSON.stringify([filter.genre]));
  }

  if (filter.platform && filter.platform !== "all") {
    query = query.contains("platforms", JSON.stringify([filter.platform]));
  }

  if (filter.minPrice) query = query.gte("price", filter.minPrice);
  if (filter.maxPrice) query = query.lte("price", filter.maxPrice);

  if (sortBy && sortBy.field) {
    query = query.order(sortBy.field, {
      ascending: sortBy.direction === "asc",
    });
  }

  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;
    query = query.range(from, to);
  }

  console.log("Filtry wysyłane do bazy:", {
    genre: filter.genre,
    platforms: filter.platform,
    prices: `${filter.minPrice} - ${filter.maxPrice}`,
  });

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Couldn't load the games list!");
  }
  return { data, count };
}

export async function getProduct(slug) {
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
