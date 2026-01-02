import Button from "../../ui/Button";
import CheckoutForm from "./components/CheckoutForm";
import CheckoutNotice from "./components/CheckoutNotice";
import OrderOverview from "./components/OrderOverview";
import { useCheckout } from "./hooks/useCheckout";

function CheckoutPage() {
  const { cart, totalPrice, totalQuantity, user, isCreating, handleCheckout } =
    useCheckout();

  if (totalQuantity === 0)
    return (
      <div className="p-20 text-center font-black uppercase italic">
        Your cart is empty!
      </div>
    );

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <h1 className="mb-10 text-5xl font-black tracking-tighter text-white uppercase italic">
        Secure <span className="text-primary">Checkout</span>
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <CheckoutForm
            user={user}
            onSubmit={handleCheckout}
            isCreating={isCreating}
          />
        </div>

        <aside className="space-y-6">
          <OrderOverview
            totalPrice={totalPrice}
            totalQuantity={totalQuantity}
            cart={cart}
          />
          <CheckoutNotice />
        </aside>
      </div>
      <div className="mt-6">
        <Button
          variant="primary"
          type="submit"
          form="checkout-form"
          disabled={isCreating}
          className="py-6 text-lg font-black tracking-widest uppercase"
        >
          {isCreating ? "Processing Order..." : "Finalize Transaction"}
        </Button>
      </div>
    </div>
  );
}

export default CheckoutPage;
