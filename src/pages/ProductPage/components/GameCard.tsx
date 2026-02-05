import type { Product } from "../../../Features/products/types/product";
import Button from "../../../ui/Button";
import Select from "../../../ui/Select";
import { useGameCard } from "../hooks/useGameCard";
import { GameBadges } from "./GameBadges";
import GamePrice from "./GamePrice";

interface GameCardProps {
  product: Product;
}

function GameCard({ product }: GameCardProps): React.JSX.Element {
  const {
    title,
    image,
    in_stock: inStock,
    region,
    rating,
    original_price: originalPrice,
    price,
    discount,
    platforms,
  } = product;

  const {
    setSelectedPlatform,
    handleAddToCart,
    isPurchasable,
    isCheckingStock,
  } = useGameCard(product);

  const platformOptions = (platforms as string[]) || [];

  return (
    <div className="bg-surface/20 grid grid-cols-1 gap-8 rounded-3xl p-8 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg">
        <img
          src={image || "/vault_logo.png"}
          alt={title}
          loading="lazy"
          className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${!inStock && "grayscale"}`}
        />
      </div>

      <div className="flex flex-col items-center gap-4 text-white">
        <h1 className="text-4xl font-black tracking-tight uppercase">
          {title}
        </h1>

        <div className="h-px w-full bg-white/10" />
        <GameBadges region={region} inStock={inStock} rating={rating} />
        <GamePrice
          price={price}
          originalPrice={originalPrice ?? price ?? 0}
          discount={discount}
        />

        <Select label="Choose Platform" options={platformOptions}>
          <Select.Label />
          <Select.Content
            onChange={(e) => setSelectedPlatform(e.target.value)}
            className="uppercase"
          />
        </Select>

        <div className="font-black">
          <Button
            variant="primary"
            className={`uppercase ${!isPurchasable && "bg-gray-500 hover:bg-gray-500"}`}
            disabled={!isPurchasable || isCheckingStock}
            onClick={handleAddToCart}
          >
            {isCheckingStock
              ? "Checking..."
              : isPurchasable
                ? "Add To Cart"
                : "Out of Stock"}
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
