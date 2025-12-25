import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../../../services/apiProducts";

export const useFilterOptions = () => {
  const { isPending, data, error } = useQuery({
    queryKey: ["filterOptions"],
    queryFn: getFilterOptions,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isPending,
    error,
    genres: data?.genres || [],
    platforms: data?.platforms || [],
  };
};
