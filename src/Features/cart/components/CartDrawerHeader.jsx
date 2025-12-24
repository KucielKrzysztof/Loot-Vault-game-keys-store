import { ShoppingCart, X } from "lucide-react";
import { useCart } from "../hooks/useCart";

function CartDrawerHeader() {
  const { totalQuantity, close } = useCart();

  return (
    <>
      <div className="flex items-center justify-between border-b border-white/10 p-6">
        <div className="flex items-center gap-3">
          <ShoppingCart className="text-primary" />
          <h2 className="text-xl font-extrabold tracking-tighter uppercase">
            Your Cart
          </h2>
          <span className="bg-primary/20 text-primary flex h-8 w-8 items-center justify-center rounded-full text-[10px] font-extrabold">
            {totalQuantity}
          </span>
        </div>
        <button
          onClick={close}
          className="rounded-full p-2 transition-colors hover:bg-white/5"
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
}

export default CartDrawerHeader;
