import { useParams } from "react-router-dom";
import { getOrderById as getOrderByIdApi } from "../../../services/apiOrders";
import { useQuery } from "@tanstack/react-query";

export const useOrder = () => {
  const { orderId } = useParams();
  const { data: order, isPending } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => getOrderByIdApi(orderId),
  });

  return { order, isPending, orderId };
};
