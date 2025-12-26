import { useDispatch, useSelector } from "react-redux";
import {
  addItemWithStockCheck as addItemWithStockCheckAction,
  removeFromCart as removeFromCartAction,
  clearCart as clearCartAction,
  openCart as openCartAction,
  closeCart as closeCartAction,
  toggleCart as toggleCartAction,
  increaseItemQuantity as increaseQtyAction,
  decreaseItemQuantity as decreaseQtyAction,
  getTotalCartQuantity,
  getTotalCartPrice,
  selectCartItems,
  selectIsCartOpen,
  selectCartStatus,
} from "../cartSlice";
import { useCallback } from "react";

export const useCart = () => {
  const dispatch = useDispatch();

  const status = useSelector(selectCartStatus);
  const cartItems = useSelector(selectCartItems);
  const isCartOpen = useSelector(selectIsCartOpen);
  const totalPrice = useSelector(getTotalCartPrice);
  const totalQuantity = useSelector(getTotalCartQuantity);

  const addItem = useCallback(
    async (product) => {
      return await dispatch(addItemWithStockCheckAction(product)).unwrap();
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

  const increaseQty = useCallback(
    (id, selectedPlatform) =>
      dispatch(increaseQtyAction({ id, selectedPlatform })),
    [dispatch],
  );

  const decreaseQty = useCallback(
    (id, selectedPlatform) =>
      dispatch(decreaseQtyAction({ id, selectedPlatform })),
    [dispatch],
  );

  return {
    cart: cartItems,
    addItem,
    isCheckingStock: status === "loading",
    removeItem,
    clear,
    totalPrice,
    totalQuantity,
    open,
    close,
    toggle,
    isCartOpen,
    increaseQty,
    decreaseQty,
  };
};
