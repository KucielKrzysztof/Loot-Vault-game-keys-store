import PageSection from "../../ui/PageSection";
import ProductsListFilter from "./components/ProductsListFilter";
import ProductsListFilterResults from "./components/ProductsListFilterResults";

import ProductsListFilterMobile from "./components/ProductsListFilterMobile";
import { useProducts } from "../../Features/products/hooks/useProducts";

function ProductsListPage() {
  const { isPending, data: products, error } = useProducts();

  if (error) return <p className="text-white">Error Loading data!</p>;

  return (
    <div className="flex w-full flex-col items-center">
      <PageSection>
        <div className="grid w-full grid-cols-3 gap-3 py-10 md:grid-cols-4">
          <ProductsListFilter />
          <ProductsListFilterMobile />
          <ProductsListFilterResults
            products={products}
            isLoading={isPending}
          />
        </div>
      </PageSection>
    </div>
  );
}
export default ProductsListPage;
