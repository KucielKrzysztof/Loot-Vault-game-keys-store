import { useOrders } from "../../Features/orders/hooks/useOrders";
import FullPageLoader from "../../ui/FullPageLoader";
import OrderCard from "./components/OrderCard";
import OrderCardSkeleton from "./components/OrderCardSkeleton";
import OrdersEmpty from "./components/OrdersEmpty";

function OrdersPage() {
  const { orders, isPending } = useOrders();

  if (isPending) return <OrderCardSkeleton />;

  if (!orders?.length) {
    return <OrdersEmpty />;
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:p-6 lg:p-12">
      <h1 className="mb-6 text-xl font-black text-white uppercase italic sm:mb-10 sm:text-2xl">
        My <span className="text-primary">Vault</span>
      </h1>

      <div className="space-y-4 sm:space-y-6">
        {orders?.map((order) => (
          <OrderCard key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
