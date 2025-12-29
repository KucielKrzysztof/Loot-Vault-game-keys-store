import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/hooks/useUser";
import { getOrders as getOrdersApi } from "../../../services/apiOrders";

export const useOrders = () => {
  const { user } = useUser();

  const {
    isPending,
    data: orders,
    error,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getOrdersApi(user?.id),
    enabled: !!user,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 720,
  });

  return { isPending, orders, error };
};
