import type React from "react";
import OrderKeyItem from "../../../Features/orders/components/OrderKeyItem";
import type { Order, OrderItem } from "../../../Features/orders/types/order";
import { formatCurrency } from "../../../utils/formatters";

interface OrderCardProps {
  order: Order;
}

function OrderCard({ order }: OrderCardProps): React.JSX.Element {
  const { id, created_at, total_price, items } = order;

  const orderItems = items as unknown as OrderItem[];

  const formattedDate = new Date(created_at).toLocaleDateString();

  return (
    <div className="bg-surface rounded-3xl border border-white/10 p-5 shadow-xl transition-all hover:border-white/20 sm:p-6">
      <div className="mb-6 flex flex-col gap-4 border-b border-white/5 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black tracking-widest text-white/30 uppercase">
            Order Reference
          </span>
          <span className="truncate text-xs font-bold text-white/80 sm:text-sm">
            #{id.slice(0, 10)}... <span className="mx-1 text-white/10">|</span>{" "}
            {formattedDate}
          </span>
        </div>

        <div className="flex flex-col sm:text-right">
          <span className="text-primary text-[10px] font-black tracking-widest uppercase">
            Total Paid
          </span>
          <p className="text-lg font-black text-white sm:text-xl">
            ${formatCurrency(total_price)}
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {orderItems.map((item, index) => (
          <OrderKeyItem key={`${id}-${item.licenseKey || index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default OrderCard;
