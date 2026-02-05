import { useProducts } from "../../../Features/products/hooks/useProducts";
import type { Product } from "../../../Features/products/types/product";

interface HomePageProducts {
  trending: Product[];
  loadingTrending: boolean;
  recommended: Product[];
  loadingRecommended: boolean;
  bestsellers: Product[];
  loadingBestsellers: boolean;
}

export const useHomePageProducts = (): HomePageProducts => {
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
    trending: trending ?? [],
    loadingTrending,
    recommended: recommended ?? [],
    loadingRecommended,
    bestsellers: bestsellers ?? [],
    loadingBestsellers,
  };
};
