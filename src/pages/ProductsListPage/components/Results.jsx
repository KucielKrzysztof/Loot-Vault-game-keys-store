import { ArrowUpDown } from "lucide-react";

import GamesGrid from "../../../ui/GamesGrid";
import Button from "../../../ui/Button";
import Select from "../../../ui/Select";

function Results({
  page,
  products,
  isLoading,
  count,
  numOfPages,
  onPageChange,
  sortBy,
  onSort,
}) {
  const sortOptions = [
    { value: "price-asc", name: "Price: Low to High" },
    { value: "price-desc", name: "Price: High to Low" },
    { value: "rating-desc", name: "Best Rated" },
  ];

  return (
    <div className="bg-surface/80 rounded-2xl px-5 py-3 backdrop-blur-2xl">
      <div className="flex justify-between">
        <div className="font-bold">
          Games found: {isLoading ? "..." : count}
        </div>
        <div className="flex gap-1 font-bold">
          <Select
            options={sortOptions}
            label={
              <span className="flex items-center gap-1">
                <ArrowUpDown size={32} /> Sort:
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
        <div className="flex gap-4 py-10">
          <Button disabled={page <= 1} onClick={() => onPageChange(page - 1)}>
            Previous
          </Button>
          <span className="text-white">
            Page {page} of {numOfPages}
          </span>
          <Button
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
