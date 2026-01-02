import { formatCurrency } from "../../../utils/formatters";

function GamePrice({ price, originalPrice, discount }) {
  return (
    <div className="bg-background/60 flex items-center justify-center gap-3 rounded-3xl p-3">
      {discount >= 1 && (
        <div className="flex flex-col text-sm">
          <div className="text-gray-400 line-through">
            ${formatCurrency(originalPrice)}
          </div>
          <div className="rounded-full bg-emerald-500 p-1">-{discount}%</div>
        </div>
      )}
      <div className="text-2xl font-bold">${formatCurrency(price)}</div>
    </div>
  );
}

export default GamePrice;
