import { useUser } from "../../../Features/auth/hooks/useUser";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { notifyError } from "../../../utils/notifications";
import { createCheckoutSession } from "../../../services/apiOrders";
import { useState } from "react";

export const useCheckout = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { cart, totalPrice, totalQuantity } = useCart();
  const { user } = useUser();

  async function handleCheckout(formData) {
    try {
      setIsProcessing(true);
      const checkoutData = {
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
      notifyError("Payment initialization failed", err.message);
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
