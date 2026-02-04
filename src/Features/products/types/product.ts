import type { Database } from "../../../services/database.types";

export type Product = Database["public"]["Tables"]["products"]["Row"];

export interface FilterArgs {
  genre?: string;
  platform?: string;
  isTrending?: boolean | null;
  isRecommended?: boolean | null;
  isBestseller?: boolean | null;
  minPrice?: number;
  maxPrice?: number;
}

export interface SortArgs {
  field: keyof Product;
  direction: "asc" | "desc";
}

export interface GetProductsParams {
  filter: FilterArgs;
  sortBy: SortArgs;
  page: number;
  pageSize?: number;
}

export interface ProductsResponse {
  data: Product[] | null;
  count: number | null;
}
