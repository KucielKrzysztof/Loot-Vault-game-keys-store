import { ShoppingCart } from "lucide-react";
import Button from "../../../ui/Button";
import { useCart } from "../hooks/useCart";

function EmptyCart() {
  const { close } = useCart();
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 opacity-30">
      <ShoppingCart size={80} strokeWidth={1} />
      <p className="text-lg font-bold tracking-widest uppercase">
        Cart is empty
      </p>
      <Button onClick={close} variant="secondary">
        Go back to store
      </Button>
    </div>
  );
}

export default EmptyCart;
