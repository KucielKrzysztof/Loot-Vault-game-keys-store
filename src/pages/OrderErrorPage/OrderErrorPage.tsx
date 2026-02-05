import { useLocation, Link, useNavigate } from "react-router-dom";

import { AlertTriangle, RefreshCw, Mail, Info, Phone } from "lucide-react";
import Button from "../../ui/Button";

function OrderErrorPage(): React.JSX.Element {
  const location = useLocation();
  const { message, orderId, technicalError } = location.state || {
    message: "An unexpected error occurred during payment processing.",
  };

  const navigate = useNavigate();

  return (
    <div className="mx-auto max-w-2xl px-6 py-20 text-center">
      <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-red-500/10">
        <AlertTriangle size={40} className="text-red-500" />
      </div>
      <h1 className="mb-4 text-2xl font-black text-white uppercase italic sm:text-3xl">
        Payment <span className="text-red-500">Verification Pending</span>
      </h1>
      <p className="mb-8 text-gray-400">{message}</p>

      <div className="bg-surface mb-10 rounded-2xl border border-white/10 p-6 text-left">
        <p className="mb-2 text-[10px] font-bold tracking-widest text-white/30 uppercase">
          Technical Details
        </p>
        <p className="font-mono text-xs break-all text-red-400/70">
          Reference: {orderId}
        </p>
        {technicalError && (
          <p className="mt-1 font-mono text-xs text-white/20">
            Status: {technicalError}
          </p>
        )}
      </div>

      <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row">
        <Button
          onClick={() => navigate(`/order-success/${orderId}`)}
          variant="primary"
          className="mx-auto flex items-center gap-2 sm:mx-0"
        >
          <RefreshCw size={18} /> Try Again
        </Button>
        <Link to="/orders">
          <Button variant="secondary">View My Orders</Button>
        </Link>
      </div>

      <div className="bg-surface mb-10 rounded-2xl border border-white/10 p-6">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full bg-yellow-500/10">
          <Info size={40} className="text-yellow-500" />
        </div>
        <h2 className="text-xl font-bold">
          If you can not see your order in your orders page or your email,
          please contact us:
        </h2>
        <div className="mt-10 flex flex-col items-center justify-center gap-2 text-xs tracking-widest text-white uppercase">
          <p>
            <Mail size={12} className="inline" /> Support: support@vault.com
          </p>
          <p>
            <Phone size={12} className="inline" /> Support: 777-777-777
          </p>
        </div>
      </div>
    </div>
  );
}

export default OrderErrorPage;
