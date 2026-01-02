function QuantitySelector({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
        <button
          onClick={onDecrease}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10"
        >
          -
        </button>
        <span className="text-primary min-w-5 text-center text-xs font-black">
          {quantity}
        </span>
        <button
          onClick={onIncrease}
          className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default QuantitySelector;
