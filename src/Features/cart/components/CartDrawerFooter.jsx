import { ArrowRight, X } from "lucide-react";
import { formatCurrency } from "../../../utils/formatters";
import { notifyGeneric } from "../../../utils/notifications";
import Button from "../../../ui/Button";
import { useCart } from "../hooks/useCart";

function CartDrawerFooter() {
  const { totalQuantity, totalPrice, clear } = useCart();

  return (
    <>
      {totalQuantity > 0 && (
        <div className="space-y-4 border-t border-white/10 bg-white/5 p-6 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-md font-semibold tracking-widest text-gray-400 uppercase">
              Total Price
            </span>
            <span className="text-2xl font-black text-white">
              ${formatCurrency(totalPrice)}
            </span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            <Button
              variant="primary"
              className="group w-full py-4 text-sm font-black uppercase"
            >
              <span>Checkout Now</span>
              <ArrowRight
                size={17}
                className="ml-2 inline-block transition-transform group-hover:translate-x-1"
              />
            </Button>
            <Button
              onClick={() => {
                clear();
                notifyGeneric("Cart cleared!", <X />);
              }}
              className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors hover:text-white"
            >
              Clear all items
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export default CartDrawerFooter;
