import { useQuery } from "@tanstack/react-query";
import { useUser } from "../../auth/hooks/useUser";
import { getOrders as getOrdersApi } from "../../../services/apiOrders";
import type { Order } from "../types/order";

export const useOrders = () => {
  const { user } = useUser();

  const {
    isPending,
    data: orders,
    error,
  } = useQuery<Order[]>({
    queryKey: ["orders", user?.id],
    queryFn: () => {
      if (!user?.id) throw new Error("User ID is missing");
      return getOrdersApi(user.id);
    },
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 60,
    gcTime: 1000 * 60 * 720,
  });

  return { isPending, orders: orders ?? [], error };
};
