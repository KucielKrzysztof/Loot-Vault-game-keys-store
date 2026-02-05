import { useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/storeHooks";
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
  type CartItem,
} from "../cartSlice";

export const useCart = () => {
  const dispatch = useAppDispatch();

  const status = useAppSelector(selectCartStatus);
  const cartItems = useAppSelector(selectCartItems);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const totalPrice = useAppSelector(getTotalCartPrice);
  const totalQuantity = useAppSelector(getTotalCartQuantity);

  const addItem = useCallback(
    async (product: CartItem) => {
      return await dispatch(addItemWithStockCheckAction(product)).unwrap();
    },
    [dispatch],
  );

  const removeItem = useCallback(
    (id: number | string, selectedPlatform: string) => {
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
    (id: number | string, selectedPlatform: string) =>
      dispatch(increaseQtyAction({ id, selectedPlatform })),
    [dispatch],
  );

  const decreaseQty = useCallback(
    (id: number | string, selectedPlatform: string) =>
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
