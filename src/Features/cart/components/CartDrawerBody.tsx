import { useCart } from "../hooks/useCart";
import EmptyCart from "./EmptyCart";
import CartItem from "./CartItem";

function CartDrawerBody(): React.JSX.Element {
  const { cart } = useCart();

  return (
    <div className="custom-scrollbar flex-1 overflow-y-auto p-6">
      {cart.length === 0 ? (
        <EmptyCart />
      ) : (
        <div className="space-y-6">
          {cart.map((item) => (
            <CartItem key={`${item.id}-${item.selectedPlatform}`} item={item} />
          ))}
        </div>
      )}
    </div>
  );
}

export default CartDrawerBody;
