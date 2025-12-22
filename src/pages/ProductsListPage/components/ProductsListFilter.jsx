import Button from "../../../ui/Button";
import CheckBoxWrapper from "../../../ui/CheckBoxWrapper";

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
        <div className="flex w-full gap-1 pb-3">
          <div className="flex w-full items-center gap-2 pb-3">
            {/* Pole  */}
            <div className="focus-within:ring-primary/50 relative flex flex-1 items-center rounded-2xl bg-white/10 px-3 focus-within:ring-1">
              <span className="text-white/40">$</span>
              <input
                type="number"
                placeholder="0"
                className="w-full bg-transparent py-2 pl-1 text-center text-white outline-none placeholder:text-white/20"
              />
            </div>

            <span className="text-white/20">-</span>

            {/* \ Max */}
            <div className="focus-within:ring-primary/50 relative flex flex-1 items-center rounded-2xl bg-white/10 px-3 focus-within:ring-1">
              <span className="text-white/40">$</span>
              <input
                type="number"
                placeholder="999"
                className="w-full bg-transparent py-2 pl-1 text-center text-white outline-none placeholder:text-white/20"
              />
            </div>
          </div>
        </div>
        <Button variant="primary" className="w-full">
          Apply Filters
        </Button>
      </div>
    </div>
  );
}

export default ProductsListFilter;
