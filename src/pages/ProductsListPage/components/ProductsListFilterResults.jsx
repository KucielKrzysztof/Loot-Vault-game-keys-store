import { ArrowUpDown } from "lucide-react";

import GamesGrid from "../../../ui/GamesGrid";

function ProductsListFilterResults({ products, isLoading }) {
  const count = products?.length || 0;
  return (
    <div className="bg-surface/80 col-span-3 rounded-2xl px-5 py-3 backdrop-blur-2xl">
      <div className="flex justify-between">
        <div className="font-bold">
          Games found: {isLoading ? "..." : count}
        </div>
        <div className="flex gap-1 font-bold">
          <ArrowUpDown /> Sort by: *Popularity*
        </div>
      </div>

      <GamesGrid games={products} isLoading={isLoading}>
        <GamesGrid.List />
      </GamesGrid>
    </div>
  );
}

export default ProductsListFilterResults;
