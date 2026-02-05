import Button from "../../../ui/Button";

interface PriceRangeProps {
  min: string;
  max: string;
  onMinChange: (val: string) => void;
  onMaxChange: (val: string) => void;
}

function PriceRange({
  min,
  max,
  onMinChange,
  onMaxChange,
}: PriceRangeProps): React.JSX.Element {
  const handleInputChange = (val: string, setter: (v: string) => void) => {
    if (Number(val) < 0) return;
    setter(val);
  };

  return (
    <>
      <h2 className="text-xs font-bold tracking-widest text-white uppercase opacity-50">
        Price Range
      </h2>
      <div className="flex flex-col">
        <div className="flex w-full gap-1">
          <div className="flex w-full items-center gap-2 pb-3">
            <div className="focus-within:ring-primary/50 relative flex flex-1 items-center rounded-2xl bg-white/10 px-3 focus-within:ring-1">
              <span className="text-white/40">$</span>
              <input
                type="number"
                value={min}
                placeholder="0"
                className="w-full bg-transparent py-2 pl-1 text-center text-white outline-none placeholder:text-white/20"
                onChange={(e) => handleInputChange(e.target.value, onMinChange)}
              />
            </div>

            <span className="text-white/20">-</span>

            <div className="focus-within:ring-primary/50 relative flex flex-1 items-center rounded-2xl bg-white/10 px-3 focus-within:ring-1">
              <span className="text-white/40">$</span>
              <input
                type="number"
                value={max}
                placeholder="999"
                className="w-full bg-transparent py-2 pl-1 text-center text-white outline-none placeholder:text-white/20"
                onChange={(e) => handleInputChange(e.target.value, onMaxChange)}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={() => {
            onMaxChange("");
            onMinChange("");
          }}
          className="mx-auto px-5 text-sm font-semibold text-white/80 uppercase hover:cursor-pointer hover:text-white"
        >
          Clear Price
        </Button>
      </div>
    </>
  );
}

export default PriceRange;
