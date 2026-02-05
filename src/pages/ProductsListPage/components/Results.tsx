import { ArrowUpDown } from "lucide-react";

import GamesGrid from "../../../ui/GamesGrid";
import Button from "../../../ui/Button";
import Select from "../../../ui/Select";
import type {
  Product,
  SortArgs,
} from "../../../Features/products/types/product";

interface ResultsProps {
  page: number;
  products: Product[];
  isLoading: boolean;
  count: number;
  numOfPages: number;
  onPageChange: (newPage: number) => void;
  sortBy: SortArgs;
  onSort: (newSortValue: string) => void;
}

function Results({
  page,
  products,
  isLoading,
  count,
  numOfPages,
  onPageChange,
  sortBy,
  onSort,
}: ResultsProps): React.JSX.Element {
  const sortOptions = [
    { value: "price-asc", name: "Price: Low to High" },
    { value: "price-desc", name: "Price: High to Low" },
    { value: "rating-desc", name: "Best Rated" },
  ];

  return (
    <div className="bg-surface/80 flex min-h-full flex-col rounded-2xl px-5 py-3 backdrop-blur-2xl">
      <div className="flex justify-between">
        <div className="font-bold">
          Games found: {isLoading ? "..." : count}
        </div>
        <div className="flex gap-1 font-bold">
          <Select
            options={sortOptions}
            label={
              <span className="flex items-center gap-1">
                <ArrowUpDown size={16} /> Sort:
              </span>
            }
            className="flex-row p-0"
          >
            <Select.Label className="text-sm text-white" />
            <Select.Content
              value={`${sortBy.field}-${sortBy.direction}`}
              onChange={(e) => {
                onSort(e.target.value);
              }}
            />
          </Select>
        </div>
      </div>

      <GamesGrid games={products} isLoading={isLoading}>
        <GamesGrid.List />
      </GamesGrid>

      {numOfPages > 1 && (
        <div className="mt-auto flex items-center gap-4">
          <Button
            variant="secondary"
            className="w-28"
            disabled={page <= 1}
            onClick={() => onPageChange(page - 1)}
          >
            Previous
          </Button>
          <span className="text-white">
            Page {page} of {numOfPages}
          </span>
          <Button
            variant="secondary"
            className="w-28"
            disabled={page >= numOfPages}
            onClick={() => onPageChange(page + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}

export default Results;
