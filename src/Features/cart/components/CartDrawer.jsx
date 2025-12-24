import { useCart } from "../hooks/useCart";
import CartDrawerFooter from "./CartDrawerFooter";
import CartDrawerBody from "./CartDrawerBody";
import CartDrawerHeader from "./CartDrawerHeader";

function CartDrawer() {
  const { isCartOpen, close } = useCart();

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
          <CartDrawerHeader />
          <CartDrawerBody />
          <CartDrawerFooter />
        </div>
      </aside>
    </>
  );
}

export default CartDrawer;
