import { useOrders } from "../../Features/orders/hooks/useOrders";
import FullPageLoader from "../../ui/FullPageLoader";
import { formatCurrency } from "../../utils/formatters";

function OrdersPage() {
  const { orders, isPending } = useOrders();

  if (isPending) return <FullPageLoader />;

  return (
    <div className="mx-auto max-w-4xl p-6 lg:p-12">
      <h1 className="mb-10 text-4xl font-black text-white uppercase italic">
        My <span className="text-primary">Orders</span>
      </h1>

      <div className="space-y-6">
        {orders?.map((order) => (
          <div
            key={order.id}
            className="bg-surface rounded-3xl border border-white/10 p-6 shadow-xl"
          >
            <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-[10px] font-bold text-white/30 uppercase">
                ID: {order.id.slice(0, 8)}... |{" "}
                {new Date(order.created_at).toLocaleDateString()}
              </span>
              <span className="text-primary font-black">
                ${formatCurrency(order.total_price)}
              </span>
            </div>

            <div className="space-y-4">
              {order.items.map((item, idx) => (
                <div
                  key={idx}
                  className="flex flex-col gap-2 rounded-2xl bg-white/5 p-4"
                >
                  <div className="flex justify-between font-bold">
                    <span>{item.title}</span>
                    <span className="text-[10px] text-white/40 uppercase">
                      {item.selectedPlatform}
                    </span>
                  </div>

                  <div className="bg-background border-primary/20 mt-2 flex items-center justify-between rounded-xl border p-3">
                    <code className="text-primary font-mono text-sm tracking-widest">
                      {item.licenseKey}
                    </code>
                    <span className="text-[8px] font-bold text-white/20 uppercase">
                      Digital Key
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
