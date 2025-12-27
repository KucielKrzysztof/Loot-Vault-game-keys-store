import { useFilterOptions } from "../../../Features/products/hooks/useFilterOptions";
import Button from "../../../ui/Button";
import CheckBoxWrapper from "../../../ui/CheckBoxWrapper";
import FilterGroup from "./FilterGroup";
import PriceRange from "./PriceRange";

function FilterContent({
  tempMin,
  setTempMin,
  tempMax,
  setTempMax,
  tempGenre,
  setTempGenre,
  tempPlatform,
  setTempPlatform,
  onApply,
}) {
  const { isPending, genres, platforms } = useFilterOptions();

  if (isPending)
    return (
      <div className="animate-pulse p-4 text-white/20">Loading filters...</div>
    );

  return (
    <div className="flex flex-col gap-6">
      <FilterGroup
        title="Categories"
        items={genres}
        render={(g) => (
          <CheckBoxWrapper
            key={g.value}
            id={g.value}
            label={g.name}
            checked={tempGenre === g.value}
            onChange={() =>
              setTempGenre(g.value === tempGenre ? "all" : g.value)
            }
          />
        )}
      />

      <FilterGroup
        title="Platforms"
        items={platforms}
        render={(p) => (
          <CheckBoxWrapper
            key={p.value}
            id={p.value}
            label={p.name}
            checked={tempPlatform === p.value.toLowerCase()}
            onChange={() =>
              setTempPlatform(
                p.value.toLowerCase() === tempPlatform
                  ? "all"
                  : p.value.toLowerCase(),
              )
            }
          />
        )}
      />

      <PriceRange
        min={tempMin}
        max={tempMax}
        onMinChange={setTempMin}
        onMaxChange={setTempMax}
      />

      <Button
        variant="primary"
        className="mt-4 w-full font-semibold uppercase"
        onClick={onApply}
      >
        Apply Filters
      </Button>
    </div>
  );
}

export default FilterContent;
