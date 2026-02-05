import { Home } from "lucide-react";
import Button from "../../../ui/Button";
import { Link } from "react-router-dom";

interface orderSuccessFooterProps {
  email: string;
}

function OrderSuccessFooter({
  email,
}: orderSuccessFooterProps): React.JSX.Element {
  return (
    <div className="mt-6 flex flex-col gap-4 sm:mt-10">
      <Link to="/home">
        <Button
          variant="primary"
          className="flex w-full items-center justify-center gap-2 py-3 font-black uppercase sm:py-4"
        >
          <Home size={18} /> Return to Store
        </Button>
      </Link>
      {email && (
        <p className="text-[9px] leading-relaxed text-white/20 uppercase">
          A copy of these keys has been sent to {email}
        </p>
      )}
    </div>
  );
}

export default OrderSuccessFooter;
