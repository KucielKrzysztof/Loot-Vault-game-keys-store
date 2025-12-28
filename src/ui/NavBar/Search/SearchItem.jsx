import { formatCurrency } from "../../../utils/formatters";

function SearchItem({ title, slug, price, originalPrice, image, onSelect }) {
  return (
    <div
      onClick={() => onSelect(slug)}
      className="group flex cursor-pointer items-center justify-start gap-2 border-b border-b-white/20 p-2 transition-all hover:bg-white/5"
    >
      <div className="w-30 shrink-0 overflow-hidden rounded-lg border border-white/10">
        <img
          src={image}
          className="transition-scale h-full w-full object-cover duration-400 group-hover:scale-110"
        />
      </div>
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="group-hover:text-primary flex w-full justify-start text-sm font-bold text-white transition-colors">
          <span className="truncate font-bold">{title}</span>
        </div>
        <div className="text-secondary ml-auto flex gap-2">
          <span className="text-[13px] text-gray-500 line-through">
            ${formatCurrency(originalPrice)}
          </span>
          <span className="text-sm">${formatCurrency(price)}</span>
        </div>
      </div>
    </div>
  );
}

export default SearchItem;
