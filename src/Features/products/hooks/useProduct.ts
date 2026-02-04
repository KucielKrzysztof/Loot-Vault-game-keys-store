import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../services/apiProducts";
import type { Product } from "../types/product";

/* GET single PRODUCT via slug (for Product page)*/
export const useProduct = (slug: string) => {
  const { isPending, data, error } = useQuery<Product>({
    queryKey: ["product", slug],
    queryFn: () => getProduct(slug),

    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 15,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: true,
  });

  return { data, isPending, error };
};
