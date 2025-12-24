import { X, Trash2, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "../hooks/useCart";
import { formatCurrency } from "../../../utils/formatters";
import Button from "../../../ui/Button";

function CartDrawer() {
  const {
    isCartOpen,
    close,
    cart,
    totalPrice,
    totalQuantity,
    removeItem,
    clear,
  } = useCart();
  return (
    <>
      {/* BACKDROP (+click outside the drawer to close)*/}
      <div
        className={`fixed inset-0 z-60 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
          isCartOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={close}
      />

      {/* DRAWER */}
      <aside
        className={`bg-background/90 fixed top-0 right-0 z-70 h-full w-full max-w-md border-l border-white/10 p-0 shadow-2xl backdrop-blur-xl transition-transform duration-500 ease-in-out ${
          isCartOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* HEADER */}
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

          {/* BODY  */}
          <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center gap-4 opacity-30">
                <ShoppingCart size={80} strokeWidth={1} />
                <p className="text-lg font-bold tracking-widest uppercase">
                  Cart is empty
                </p>
                <Button onClick={close} variant="secondary">
                  Go back to store
                </Button>
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div
                    key={`${item.id}-${item.selectedPlatform}`}
                    className="group flex gap-4"
                  >
                    <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl border border-white/10">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-between py-1">
                      <div>
                        <h4 className="text-sm leading-tight font-bold">
                          {item.title}
                        </h4>
                        <p className="text-primary text-[10px] font-medium tracking-widest uppercase">
                          {item.selectedPlatform}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-xs text-gray-400">
                          Qty:{" "}
                          <span className="text-primary">x{item.quantity}</span>
                        </p>
                        <p className="font-bold text-white">
                          ${formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeItem(item.id, item.selectedPlatform)}
                      className="flex items-center justify-center self-center rounded-lg p-2 text-gray-500 transition-all hover:bg-red-500/10 hover:text-red-500"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* FOOTER */}
          {cart.length > 0 && (
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
                  onClick={clear}
                  className="text-xs font-bold tracking-widest text-gray-500 uppercase transition-colors hover:text-white"
                >
                  Clear all items
                </Button>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;
