import { useDispatch, useSelector } from "react-redux";
import {
  addToCart as addToCartAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  openCart as openCartAction,
  closeCart as closeCartAction,
  toggleCart as toggleCartAction,
  getTotalCartQuantity,
  getTotalCartPrice,
  selectCartItems,
  selectIsCartOpen,
} from "../cartSlice";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useDispatch();

  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  const addItem = useCallback(
    (product) => {
      dispatch(addToCartAction(product));
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (id, selectedPlatform) => {
      dispatch(removeFromCartAction({ id, selectedPlatform }));
    },
    [dispatch],
  );

  const open = useCallback(() => dispatch(openCartAction()), [dispatch]);
  const close = useCallback(() => dispatch(closeCartAction()), [dispatch]);
  const toggle = useCallback(() => dispatch(toggleCartAction()), [dispatch]);

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
    open,
    close,
    toggle,
    isCartOpen,
  };
};
