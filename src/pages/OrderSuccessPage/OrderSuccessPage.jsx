import FullPageLoader from "../../ui/FullPageLoader";
import { useOrder } from "../../Features/orders/hooks/useOrder";
import OrderSuccessHeader from "./components/OrderSuccessHeader";
import OrderKeyItem from "../../Features/orders/components/OrderKeyItem";
import OrderSuccessFooter from "./components/OrderSuccessFooter";
import { useCart } from "../../Features/cart/hooks/useCart";
import { useEffect } from "react";

function OrderSuccessPage() {
  const { order, isPending, orderId } = useOrder();
  const { clear } = useCart();

  useEffect(() => {
    clear();
  }, [clear]);

  if (isPending) return <FullPageLoader />;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 text-center sm:px-6 sm:py-20">
      <OrderSuccessHeader orderId={orderId} />

      <div className="bg-surface rounded-3xl border border-white/10 p-5 shadow-2xl sm:p-8">
        <h2 className="mb-6 text-left text-[11px] font-black tracking-widest text-white/40 uppercase sm:text-sm">
          Your Digital Keys:
        </h2>

        <div className="space-y-4">
          {order?.items.map((item) => (
            <OrderKeyItem key={item.id} item={item} />
          ))}
        </div>

        <OrderSuccessFooter email={order?.shipping_details?.shippingEmail} />
      </div>
    </div>
  );
}

export default OrderSuccessPage;
