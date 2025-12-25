import {
  keepPreviousData,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../../services/apiProducts";

export const useProducts = () => {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const genre = searchParams.get("genre") || "all";
  const platform = searchParams.get("platform") || "all";
  const minPrice = Number(searchParams.get("minPrice")) || 0;
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000;
  const sortByRaw = searchParams.get("sortBy") || "price-asc";
  const page = Number(searchParams.get("page")) || 1;

  const [field, direction] = sortByRaw.split("-");

  const filter = { genre, platform, minPrice, maxPrice };
  const sortBy = { field, direction };

  const { isPending, data, error, isPlaceholderData } = useQuery({
    queryKey: [
      "products",
      genre,
      platform,
      minPrice,
      maxPrice,
      sortByRaw,
      page,
    ],
    queryFn: () => getProducts({ filter, sortBy, page }),
    placeholderData: keepPreviousData,
    staleTime: 60 * 1000 * 5,
    gcTime: 60 * 1000 * 15,
    refetchInterval: 60 * 1000 * 5,
    refetchOnWindowFocus: false,
    retry: 2,
    enabled: true,
  });

  const pageSize = 12;
  const count = data?.count || 0;
  const numOfPages = Math.ceil(count / pageSize);

  /* prefetch if more than one page */
  if (page < numOfPages) {
    queryClient.prefetchQuery({
      queryKey: [
        "products",
        genre,
        platform,
        minPrice,
        maxPrice,
        sortByRaw,
        page + 1,
        sortBy,
      ],
      queryFn: () => getProducts({ filter, sortBy, page: page + 1 }),
    });
  }

  return {
    products: data?.data,
    count: data?.count,
    isPending,
    error,
    isPlaceholderData,
    numOfPages,
    page,
    sortBy,
  };
};
