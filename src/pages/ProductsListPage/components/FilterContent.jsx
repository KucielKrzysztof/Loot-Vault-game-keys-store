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
  const genres = [
    "action",
    "shooter",
    "fighting",
    "sports",
    "adventure",
    "rpg",
    "story-rich",
    "open-world",
  ];
  const platforms = ["steam", "gog", "xbox", "ps5"];

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
          Categories
        </h2>
        <div className="flex flex-col gap-2">
          {genres.map((g) => (
            <CheckBoxWrapper
              key={g}
              id={g}
              checked={tempGenre === g}
              onChange={() => setTempGenre(g === tempGenre ? "all" : g)}
            />
          ))}
        </div>
      </div>

      <div>
        <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
          Platforms
        </h2>
        <div className="flex flex-col gap-2">
          {platforms.map((p) => (
            <CheckBoxWrapper
              key={p}
              id={p}
              label={p}
              checked={tempPlatform === p.toLowerCase()}
              onChange={() =>
                setTempPlatform(
                  p.toLowerCase() === tempPlatform ? "all" : p.toLowerCase(),
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
