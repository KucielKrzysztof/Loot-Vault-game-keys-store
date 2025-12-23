import Button from "../../../ui/Button";
import CheckBoxWrapper from "../../../ui/CheckBoxWrapper";
import PriceRange from "./PriceRange";

function ProductsListFilter() {
  return (
    <div className="bg-surface/80 col-span-1 mb-auto hidden flex-col justify-start rounded-2xl px-5 py-4 backdrop-blur-2xl md:flex">
      <div className="flex flex-col items-start justify-center text-white/40">
        <h2 className="py-2 text-white">Categories</h2>
        <CheckBoxWrapper id="action" />
        <CheckBoxWrapper id="shooter" />
        <CheckBoxWrapper id="fighting" />
        <CheckBoxWrapper id="sports" />
        <CheckBoxWrapper id="adventure" />
        <CheckBoxWrapper id="RPG" />
        <h2 className="py-2 text-white">Platforms</h2>
        <CheckBoxWrapper id="Steam" />
        <CheckBoxWrapper id="GOG" />
        <CheckBoxWrapper id="Epic Games" />
        <CheckBoxWrapper id="XBOX" />
        <CheckBoxWrapper id="PS5" />
        <h2 className="py-2 text-white">Price</h2>
        <PriceRange />
        <Button variant="primary" className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default ProductsListFilter;
