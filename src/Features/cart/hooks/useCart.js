import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  getTotalCartQuantity,
  getTotalCartPrice,
  selectCartItems,
} from "../carSlice";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  const addItem = useCallback(
    (product) => {
      dispatch(addToCartAction(product));
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (id) => {
      dispatch(removeFromCartAction(id));
    },
    [dispatch],
  );

  const clear = useCallback(() => {
    dispatch(clearCartAction());
  }, [dispatch]);

  return {
    cart: cartItems,
    addItem,
    removeItem,
    clear,
    totalPrice,
    totalQuantity,
  };
};
