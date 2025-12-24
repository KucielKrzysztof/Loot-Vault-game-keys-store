import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getProducts } from "../../../services/apiProducts";

export const useProducts = () => {
  const { isPending, data, error, isPlaceholderData } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 15,
    refetchInterval: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: true,
  });

  return { data, isPending, error, isPlaceholderData };
};
