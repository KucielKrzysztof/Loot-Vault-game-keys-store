import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
} from "../carSlice";

export const useCart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  function addItem(product) {
    dispatch(addToCartAction(product));
  }

  function removeItem(id) {
    dispatch(removeFromCartAction(id));
  }

  function clear() {
    dispatch(clearCartAction());
  }

  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item * item.quantity,
    0,
  );

  return { cart: cartItems, addItem, removeItem, clear, totalPrice };
};
