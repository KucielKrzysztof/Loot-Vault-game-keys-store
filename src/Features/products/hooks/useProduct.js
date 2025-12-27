import { useQuery } from "@tanstack/react-query";
import { getProduct } from "../../../services/apiProducts";

export const useProduct = (slug) => {
  const { isPending, data, error } = useQuery({
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
