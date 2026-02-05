import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { notifyAddedToCart, notifyError } from "../../../utils/notifications";
import type { Product } from "../../../Features/products/types/product";
import type { CartItem } from "../../../Features/cart/cartSlice";

export const useGameCard = (product: Product) => {
  const queryClient = useQueryClient();

  const { addItem, open, isCheckingStock } = useCart();

  const { id, title, price, image, platforms, slug, in_stock } = product;

  const platformList = (platforms as string[]) || [];

  const [selectedPlatform, setSelectedPlatform] = useState<string>(
    platformList[0] || "PC",
  );

  const isPurchasable =
    in_stock && typeof product.price === "number" && product.price > 0;

  async function handleAddToCart() {
    if (!product || !isPurchasable) return;

    const newItem: CartItem = {
      id,
      title,
      price,
      image: image || "",
      selectedPlatform,
      quantity: 1,
    };

    try {
      await addItem(newItem);
      notifyAddedToCart(title, selectedPlatform, open);
    } catch (error: unknown) {
      const message =
        error instanceof Error ? error.message : "Could not add item";
      notifyError("Cart Error", message);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (slug) {
        queryClient.invalidateQueries({ queryKey: ["product", slug] });
      }
    }
  }

  return {
    selectedPlatform,
    setSelectedPlatform,
    handleAddToCart,
    isPurchasable,
    isCheckingStock,
  };
};
