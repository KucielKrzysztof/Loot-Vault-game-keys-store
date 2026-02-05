import { Link } from "react-router-dom";
import Button from "../../../ui/Button";

function OrdersEmpty(): React.JSX.Element {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center text-center">
      <h2 className="mb-4 text-2xl font-black text-white uppercase italic">
        Your Vault is <span className="text-primary">Empty</span>
      </h2>
      <p className="mb-8 text-white/50">You haven't unlocked any games yet.</p>
      <Link to="/products">
        <Button variant="primary">Start Shopping</Button>
      </Link>
    </div>
  );
}

export default OrdersEmpty;
