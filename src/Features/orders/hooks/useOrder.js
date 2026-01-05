import { useParams } from "react-router-dom";
import { getOrderById as getOrderByIdApi } from "../../../services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export const useOrder = () => {
  const { orderId } = useParams();
  const {
    data: order,
    isPending,
    error,
  } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderByIdApi(orderId),
    retry: 3,
    retryDelay: 2000,
  });

  return { order, isPending, orderId, error };
};
