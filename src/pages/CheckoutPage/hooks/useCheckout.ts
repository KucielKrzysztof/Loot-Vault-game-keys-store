import { useUser } from "../../../Features/auth/hooks/useUser";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { notifyError } from "../../../utils/notifications";
import {
  createCheckoutSession,
  type CheckoutData,
} from "../../../services/apiOrders";
import { useState } from "react";
import type { CheckoutFormValues } from "../components/CheckoutForm";

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, totalPrice, totalQuantity } = useCart();
  const { user } = useUser();

  async function handleCheckout(formData: CheckoutFormValues) {
    try {
      setIsProcessing(true);

      if (cart.length === 0) throw new Error("Your cart is empty");

      const checkoutData: CheckoutData = {
        items: cart,
        user_id: user?.id || null,
        shippingDetails: formData,
      };

      const data = await createCheckoutSession(checkoutData);

      /* payment url from stripe */
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      notifyError("Payment initialization failed", errorMessage);
    } finally {
      setIsProcessing(false);
    }
  }

  return {
    cart,
    totalPrice,
    totalQuantity,
    user,
    handleCheckout,
    isProcessing,
  };
};
