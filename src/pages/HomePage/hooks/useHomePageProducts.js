import { useProducts } from "../../../Features/products/hooks/useProducts";

export const useHomePageProducts = () => {
  const { products: trending, isPending: loadingTrending } = useProducts({
    isTrending: true,
  });

  const { products: recommended, isPending: loadingRecommended } = useProducts({
    isRecommended: true,
  });

  const { products: bestsellers, isPending: loadingBestsellers } = useProducts({
    isBestseller: true,
  });

  return {
    trending,
    loadingTrending,
    recommended,
    loadingRecommended,
    bestsellers,
    loadingBestsellers,
  };
};
