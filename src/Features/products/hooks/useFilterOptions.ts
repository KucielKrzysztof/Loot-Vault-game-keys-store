import { useQuery } from "@tanstack/react-query";
import { getFilterOptions } from "../../../services/apiProducts";

export interface FilterOption {
  value: string;
  name: string;
}

interface FilterOptionsResponse {
  genres: FilterOption[];
  platforms: FilterOption[];
}

export const useFilterOptions = () => {
  const { isPending, data, error } = useQuery<FilterOptionsResponse>({
    queryKey: ["filterOptions"],
    queryFn: getFilterOptions,
    staleTime: 1000 * 60 * 60,
  });

  return {
    isPending,
    error,
    genres: data?.genres ?? [],
    platforms: data?.platforms ?? [],
  };
};
