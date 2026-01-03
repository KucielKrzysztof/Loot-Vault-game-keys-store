import { useUser } from "../../../Features/auth/hooks/useUser";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { useCreateOrder } from "../../../Features/orders/hooks/useCreateOrder";
import { generateGameKey } from "../../../utils/gameKeyGenerator";

export const useCheckout = () => {
  const { cart, totalPrice, totalQuantity } = useCart();
  const { user } = useUser();
  const { createOrder, isCreating } = useCreateOrder();

  function handleCheckout(formData) {
    const itemsWithKeys = cart.map((item) => {
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
    createOrder(orderData);
  }

  return { cart, totalPrice, totalQuantity, user, isCreating, handleCheckout };
};
