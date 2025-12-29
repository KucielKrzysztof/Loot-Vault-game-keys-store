import { Link } from "react-router-dom";
import { CheckCircle, Copy, Home } from "lucide-react";
import FullPageLoader from "../../ui/FullPageLoader";
import Button from "../../ui/Button";
import { notifyGeneric } from "../../utils/notifications";
import { useOrder } from "../../Features/orders/hooks/useOrder";

function OrderSuccessPage() {
  const { order, isPending, orderId } = useOrder();

  if (isPending) return <FullPageLoader />;

  const handleCopy = (key) => {
    navigator.clipboard.writeText(key);
    notifyGeneric("Key copied to clipboard!", "OK");
  };

  return (
    <div className="mx-auto max-w-3xl p-6 py-20 text-center">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-primary/20 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
          <CheckCircle size={48} className="text-primary" />
        </div>
        <h1 className="text-4xl font-black tracking-tighter text-white uppercase italic">
          Payment <span className="text-primary">Confirmed</span>
        </h1>
        <p className="mt-2 text-xs font-bold tracking-widest text-white/50 uppercase">
          Order ID: {orderId}
        </p>
      </div>

      <div className="bg-surface rounded-3xl border border-white/10 p-8 shadow-2xl">
        <h2 className="mb-6 text-left text-sm font-black tracking-widest text-white/40 uppercase">
          Your Digital Keys:
        </h2>

        <div className="space-y-4">
          {order?.items.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-white/5 p-5 text-left"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-white">{item.title}</span>
                <span className="bg-primary/10 text-primary rounded-md px-2 py-1 text-[10px] font-black uppercase">
                  {item.selectedPlatform}
                </span>
              </div>

              <div className="bg-background group border-primary/20 hover:border-primary/50 flex items-center justify-between rounded-xl border p-4 transition-all">
                <code className="text-primary font-mono text-lg tracking-[0.2em]">
                  {item.licenseKey}
                </code>
                <button
                  onClick={() => handleCopy(item.licenseKey)}
                  className="hover:text-primary text-white/20 transition-colors"
                >
                  <Copy size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-4">
          <Link to="/home">
            <Button
              variant="primary"
              className="flex w-full items-center justify-center gap-2 py-4 font-black uppercase"
            >
              <Home size={18} /> Return to Store
            </Button>
          </Link>
          <p className="text-[10px] font-medium text-white/20 uppercase">
            A copy of these keys has been sent to{" "}
            {order?.shipping_details?.shippingEmail}
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
