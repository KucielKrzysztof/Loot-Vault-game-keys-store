import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../cart/hooks/useCart";
import { createOrder as createOrderApi } from "../../../services/apiOrders";
import { notifyError, notifyGeneric } from "../../../utils/notifications";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { clear } = useCart();

  const { mutate: createOrder, isPending: isCreating } = useMutation({
    mutationFn: createOrderApi,
    onSuccess: (data) => {
      notifyGeneric("Order placed!", "View Orders", () => navigate("/orders"));
      clear();
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate(`/order-success/${data.id}`);
    },
    onError: (error) => notifyError("Order failed", error.message),
  });

  return { createOrder, isCreating };
};
