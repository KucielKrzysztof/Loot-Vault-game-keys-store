import CartItem from "../../../Features/cart/components/CartItem";
import { formatCurrency } from "../../../utils/formatters";

function OrderOverview({ totalPrice, totalQuantity , cart}) {
  return (
    <div className="bg-surface sticky top-24 rounded-3xl border border-white/10 p-8 shadow-2xl">
      <div className="mb-8 flex items-center justify-between">
        <h2 className="text-primary text-sm font-black tracking-[0.2em] uppercase">
          Order Review
        </h2>
        <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-white/50">
          {totalQuantity} Items
        </span>
      </div>

      <div className="custom-scrollbar max-h-[50vh] space-y-8 overflow-y-auto pr-4">
        {cart.map((item) => (
          <CartItem key={`${item.id}-${item.selectedPlatform}`} item={item} />
        ))}
      </div>

      <div className="mt-10 space-y-4 border-t border-white/10 pt-8">
        <div className="flex items-center justify-between text-white/60">
          <span className="text-sm font-medium tracking-widest uppercase">
            Subtotal
          </span>
          <span className="font-bold">${formatCurrency(totalPrice)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">Final Total</span>
          <span className="text-primary text-4xl font-black">
            ${formatCurrency(totalPrice)}
          </span>
        </div>
      </div>
    </div>
  );
}

export default OrderOverview;
