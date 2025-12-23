import PageSection from "../../ui/PageSection";
import ProductsListFilter from "./components/ProductsListFilter";
import ProductsListFilterResults from "./components/ProductsListFilterResults";
import { productList } from "../../assets/mockdata";
import ProductsListFilterMobile from "./components/ProductsListFilterMobile";

function ProductsListPage() {
  return (
    <div className="flex w-full flex-col items-center">
      <PageSection>
        <div className="grid w-full grid-cols-3 gap-3 py-10 md:grid-cols-4">
          <ProductsListFilter />
          <ProductsListFilterMobile />
          <ProductsListFilterResults products={productList} />
        </div>
      </PageSection>
    </div>
  );
}
export default ProductsListPage;
