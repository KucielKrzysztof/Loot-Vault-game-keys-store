import { CheckCircle } from "lucide-react";

function OrderSuccessHeader({ orderId }) {
  return (
    <div className="mb-6 flex flex-col items-center sm:mb-8">
      <div className="bg-primary/20 mb-4 flex h-16 w-16 items-center justify-center rounded-full sm:mb-6 sm:h-20 sm:w-20">
        <CheckCircle size={32} className="text-primary sm:size-12" />
      </div>
      <h1 className="text-2xl font-black tracking-tighter text-white uppercase italic sm:text-4xl">
        Payment <span className="text-primary">Confirmed</span>
      </h1>
      <p className="mt-2 text-[10px] font-bold tracking-widest text-white/50 uppercase sm:text-xs">
        Order ID: {orderId}
      </p>
    </div>
  );
}

export default OrderSuccessHeader;
