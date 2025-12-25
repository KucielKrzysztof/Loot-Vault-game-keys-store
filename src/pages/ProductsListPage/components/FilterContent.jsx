import { useFilterOptions } from "../../../Features/products/hooks/useFilterOptions";
import Button from "../../../ui/Button";
import CheckBoxWrapper from "../../../ui/CheckBoxWrapper";
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
      <div>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
          Categories
        </h2>
        <div className="flex flex-col gap-2">
          {genres?.map((g) => (
            <CheckBoxWrapper
              key={g.value}
              id={g.value}
              label={g.name}
              checked={tempGenre === g.value}
              onChange={() =>
                setTempGenre(g.value === tempGenre ? "all" : g.value)
              }
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
          Platforms
        </h2>
        <div className="flex flex-col gap-2">
          {platforms?.map((p) => (
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
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
          Price Range
        </h2>
        <PriceRange
          min={tempMin}
          max={tempMax}
          onMinChange={setTempMin}
          onMaxChange={setTempMax}
        />
      </div>

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
