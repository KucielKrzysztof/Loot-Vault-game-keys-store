import { Trash2 } from "lucide-react";
import { formatCurrency } from "../../../utils/formatters";
import { useCart } from "../hooks/useCart";

function CartItem({ item }) {
  const { removeItem, increaseQty, decreaseQty } = useCart();
  return (
    <div className="group flex gap-4">
      {/* IMAGE */}
      <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
        <img
          src={item.image}
          alt={item.title}
          className="h-full w-full object-cover"
        />
      </div>
      {/* CART ITEM INFO + QUANTITY CHANGE */}
      <div className="flex flex-1 flex-col justify-between py-1">
        <div>
          <h4 className="text-sm leading-tight font-bold">{item.title}</h4>
          <p className="text-primary text-[10px] font-medium tracking-widest uppercase">
            {item.selectedPlatform}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => decreaseQty(item.id, item.selectedPlatform)}
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10"
            >
              -
            </button>
            <span className="text-primary min-w-[20px] text-center text-xs font-black">
              {item.quantity}
            </span>
            <button
              onClick={() => increaseQty(item.id, item.selectedPlatform)}
              className="flex h-6 w-6 items-center justify-center rounded-md transition-colors hover:bg-white/10"
            >
              +
            </button>
          </div>
        </div>
      </div>
      {/* REMOVE ITEM and PRICE DISPLAY */}
      <div className="flex flex-col items-center justify-center gap-5">
        <button
          onClick={() => removeItem(item.id, item.selectedPlatform)}
          className="flex items-center justify-center self-center rounded-lg p-2 text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-500"
        >
          <Trash2 size={18} />
        </button>
        <p className="text-sm font-bold text-white">
          ${formatCurrency(item.price * item.quantity)}
        </p>
      </div>
    </div>
  );
}

export default CartItem;
