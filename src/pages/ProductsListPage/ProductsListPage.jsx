import { useState } from "react";
import { useProducts } from "../../Features/products/hooks/useProducts";
import { useSearchParams } from "react-router-dom";
import { SlidersHorizontal, X } from "lucide-react";
import PageSection from "../../ui/PageSection";
import FilterContent from "./components/FilterContent";
import Results from "./components/Results";
import Button from "../../ui/Button";

function ProductsListPage() {
  const { isPending, products, count, error, numOfPages, page, sortBy } =
    useProducts();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [tempMin, setTempMin] = useState(searchParams.get("minPrice") || "");
  const [tempMax, setTempMax] = useState(searchParams.get("maxPrice") || "");
  const [tempGenre, setTempGenre] = useState(
    searchParams.get("genre") || "all",
  );
  const [tempPlatform, setTempPlatform] = useState(
    searchParams.get("platform") || "all",
  );

  const handleApply = () => {
    searchParams.set("minPrice", tempMin);
    searchParams.set("maxPrice", tempMax);
    searchParams.set("genre", tempGenre);
    searchParams.set("platform", tempPlatform);
    searchParams.set("page", "1");
    setSearchParams(searchParams);
    setIsMobileMenuOpen(false);
  };

  const filterProps = {
    tempMin,
    setTempMin,
    tempMax,
    setTempMax,
    tempGenre,
    setTempGenre,
    tempPlatform,
    setTempPlatform,
    onApply: handleApply,
  };

  if (error) return <p className="text-white">Error Loading data!</p>;

  return (
    <div className="relative flex w-full flex-col items-center">
      <PageSection>
        <div className="mt-4 md:hidden">
          <Button
            onClick={() => setIsMobileMenuOpen(true)}
            className="bg-surface/80 flex w-full items-center justify-center gap-2 rounded-2xl py-4"
          >
            <SlidersHorizontal size={20} /> Show Filters
          </Button>
        </div>

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
            onPageChange={(p) => {
              searchParams.set("page", p);
              setSearchParams(searchParams);
            }}
            onSort={(v) => {
              searchParams.set("sortBy", v);
              setSearchParams(searchParams);
            }}
          />
        </div>
      </PageSection>
      {/* mobile drawer */}
      <div
        className={`fixed inset-0 z-100 transition-all duration-300 md:hidden ${isMobileMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}
      >
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
        <div
          className={`bg-background absolute top-0 left-0 h-full w-[85%] max-w-sm p-6 shadow-2xl transition-transform duration-300 ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <div className="mb-8 flex items-center justify-between">
            <h2 className="text-xl font-bold">Filters</h2>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white/50"
            >
              <X size={24} />
            </button>
          </div>
          <div className="h-[calc(100vh-150px)] overflow-y-auto">
            <FilterContent {...filterProps} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ProductsListPage;
