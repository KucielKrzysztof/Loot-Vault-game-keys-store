import { useQuery } from "@tanstack/react-query";
import { searchProducts } from "../../../services/apiProducts";

export const useSearch = (debouncedQuery) => {
  const { isPending, data, error } = useQuery({
    queryKey: ["searchItems", debouncedQuery],
    queryFn: () => searchProducts(debouncedQuery),
    enabled: debouncedQuery.length >= 3,
    staleTime: 1000 * 60 * 5,
    retry: 5,
  });

  return { isPending, results: data || [], error };
};
