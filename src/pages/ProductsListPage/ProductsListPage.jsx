import { useState } from "react";
import { useProducts } from "../../Features/products/hooks/useProducts";

import PageSection from "../../ui/PageSection";
import FilterContent from "./components/FilterContent";
import Results from "./components/Results";

import { useProductFilters } from "../../Features/products/hooks/useProductFilters";
import MobileFilterDrawer from "./components/MobileFilterDrawer";
import MobileFilterTriggerButton from "./components/MobileFilterTriggerButton";

function ProductsListPage() {
  const { isPending, products, count, error, numOfPages, page, sortBy } =
    useProducts();

  const { filters, setters, applyFilters } = useProductFilters();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const filterProps = {
    ...filters,
    ...setters,
    onApply: () => {
      applyFilters();
      setIsMobileMenuOpen(false);
    },
  };

  if (error) return <p className="text-white">Error Loading data!</p>;

  return (
    <div className="relative flex w-full flex-col items-center">
      <PageSection>
        <MobileFilterTriggerButton onClose={() => setIsMobileMenuOpen(true)} />

        <div className="grid w-full grid-cols-1 items-start gap-6 py-10 md:grid-cols-[280px_1fr]">
          <aside className="bg-surface/80 sticky hidden h-fit rounded-2xl p-6 backdrop-blur-2xl md:block">
            <FilterContent {...filterProps} />
          </aside>
          <Results
            {...{
              page,
              products,
              count,
              numOfPages,
              sortBy,
              isLoading: isPending,
            }}
            onPageChange={setters.setPage}
            onSort={setters.setSort}
          />
        </div>
      </PageSection>
      <MobileFilterDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        filterProps={filterProps}
      />
    </div>
  );
}
export default ProductsListPage;
