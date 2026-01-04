import { useUser } from "../../../Features/auth/hooks/useUser";
import { useCart } from "../../../Features/cart/hooks/useCart";
/* import { useCreateOrder } from "../../../Features/orders/hooks/useCreateOrder"; */
import { supabase } from "../../../services/supabase";
/* import { generateGameKey } from "../../../utils/gameKeyGenerator"; */
import { notifyError } from "../../../utils/notifications";

export const useCheckout = () => {
  const { cart, totalPrice, totalQuantity } = useCart();
  const { user } = useUser();
  /*   const { createOrder, isCreating } = useCreateOrder(); */

  async function handleCheckout(formData) {
    try {
      const { data, error } = await supabase.functions.invoke(
        "swift-processor",
        {
          body: {
            items: cart,
            user_id: user?.id || null,
            shippingDetails: formData,
          },
        },
      );

      if (error) throw error;

      // 2. Przekierowujemy użytkownika do Stripe
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (err) {
      notifyError("Payment initialization failed", err.message);
    }

    /*  const itemsWithKeys = cart.map((item) => {
      const keys = Array.from({ length: item.quantity }, () =>
        generateGameKey(),
      );
      return {
        ...item,
        licenseKeys: keys,
      };
    });

    const orderData = {
      user_id: user?.id || null,
      items: itemsWithKeys,
      total_price: totalPrice,
      status: "completed",
      shipping_details: formData,
    };
    createOrder(orderData); */
  }

  return {
    cart,
    totalPrice,
    totalQuantity,
    user,
    /* isCreating, */ handleCheckout,
  };
};
