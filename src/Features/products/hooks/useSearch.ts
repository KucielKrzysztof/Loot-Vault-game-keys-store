import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../../services/apiProducts";
import type { Product } from "../types/product";

export const useSearch = (debouncedQuery: string) => {
  const { isPending, data, error } = useQuery<Product[]>({
    queryKey: ["searchItems", debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 1000 * 60 * 5,
    retry: 3,
  });

  return { isPending, results: data ?? [], error };
};
