import { useParams } from "react-router-dom";
import { getOrderById as getOrderByIdApi } from "../../../services/apiOrders";
import { useQuery } from "@tanstack/react-query";
import type { Order } from "../types/order";

export const useOrder = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const {
    data: order,
    isPending,
    error,
  } = useQuery<Order | null>({
    queryKey: ["order", orderId],
    queryFn: () => getOrderByIdApi(orderId as string),
    retry: 3,
    retryDelay: 2000,
  });

  return { order, isPending, orderId, error };
};
