import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { notifyAddedToCart, notifyError } from "../../../utils/notifications";

export const useGameCard = (product) => {
  const queryClient = useQueryClient();

  const { addItem, open, isCheckingStock } = useCart();

  const { id, title, price, image } = product;

  const [selectedPlatform, setSelectedPlatform] = useState(
    product.platforms[0],
  );
  const isPurchasable =
    product.in_stock && typeof product.price === "number" && product.price > 0;

  async function handleAddToCart() {
    if (!product) return;
    if (!isPurchasable) return;
    const newItem = { id, title, price, image, selectedPlatform };

    try {
      await addItem(newItem);
      notifyAddedToCart(title, selectedPlatform, open);
    } catch (error) {
      notifyError("Could not add item to cart", error);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (product.slug) {
        queryClient.invalidateQueries({ queryKey: ["product", product.slug] });
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
