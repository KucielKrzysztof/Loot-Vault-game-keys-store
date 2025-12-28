import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../../../services/apiAuth";

export const useUser = () => {
  const {
    isPending,
    data: user,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: getCurrentUser,
    staleTime: 1000 * 60 * 10,
  });

  return {
    isPending,
    user,
    error,
    isAuthenticated: user?.role === "authenticated",
  };
};
