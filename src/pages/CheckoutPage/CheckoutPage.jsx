import { useUser } from "../../Features/auth/hooks/useUser";
import CartItem from "../../Features/cart/components/CartItem";
import { useCart } from "../../Features/cart/hooks/useCart";
import { useCreateOrder } from "../../Features/orders/hooks/useCreateOrder";
import { formatCurrency } from "../../utils/formatters";
import { generateGameKey } from "../../utils/gameKeyGenerator";
import CheckoutForm from "./components/CheckoutForm";

function CheckoutPage() {
  const { cart, totalPrice, totalQuantity } = useCart();
  const { user } = useUser();
  const { createOrder, isCreating } = useCreateOrder();

  if (totalQuantity === 0)
    return (
      <div className="p-20 text-center font-black uppercase italic">
        Your cart is empty!
      </div>
    );

  function handleFinalSubmit(formData) {
    const itemsWithKeys = cart.map((item) => ({
      ...item,
      licenseKey: generateGameKey(),
    }));

    const orderData = {
      user_id: user?.id || null,
      items: itemsWithKeys,
      total_price: totalPrice,
      status: "completed",
      shipping_details: formData,
    };
    createOrder(orderData);
  }

  return (
    <div className="mx-auto max-w-6xl p-6 lg:p-12">
      <h1 className="mb-10 text-5xl font-black tracking-tighter text-white uppercase italic">
        Secure <span className="text-primary">Checkout</span>
      </h1>

      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-6">
          <CheckoutForm
            user={user}
            onSubmit={handleFinalSubmit}
            isCreating={isCreating}
          />
        </div>

        <aside className="space-y-6">
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
                <CartItem
                  key={`${item.id}-${item.selectedPlatform}`}
                  item={item}
                />
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
                <span className="text-xl font-bold text-white">
                  Final Total
                </span>
                <span className="text-primary text-4xl font-black">
                  ${formatCurrency(totalPrice)}
                </span>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 p-6">
            <ul className="list-disc text-left">
              <li className="text-[11px] leading-relaxed font-medium tracking-widest text-white/30 uppercase">
                Digital product keys are delivered via email. Check your "Key
                Delivery Email" after purchase.
              </li>
              <li className="text-[11px] leading-relaxed font-medium tracking-widest text-white/30 uppercase">
                By confirming, you agree to our digital delivery terms. Keys are
                generated instantly after payment.
              </li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default CheckoutPage;
