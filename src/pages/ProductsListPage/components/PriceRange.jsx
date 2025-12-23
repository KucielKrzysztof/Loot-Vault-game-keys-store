function PriceRange() {
  return (
    <div className="flex w-full gap-1 pb-3">
      <div className="flex w-full items-center gap-2 pb-3">
        <div className="focus-within:ring-primary/50 relative flex flex-1 items-center rounded-2xl bg-white/10 px-3 focus-within:ring-1">
          <span className="text-white/40">$</span>
          <input
            type="number"
            placeholder="0"
            className="w-full bg-transparent py-2 pl-1 text-center text-white outline-none placeholder:text-white/20"
          />
        </div>

        <span className="text-white/20">-</span>

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
  );
}

export default PriceRange;
