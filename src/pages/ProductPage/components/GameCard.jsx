import { CheckCircle, Globe, Star } from "lucide-react";
import Button from "../../../ui/Button";
import { formatCurrency } from "../../../utils/formatters";
import Select from "../../../ui/Select";
import { useCart } from "../../../Features/cart/hooks/useCart";
import { useState } from "react";
import { notifyAddedToCart, notifyError } from "../../../utils/notifications";
import { useQueryClient } from "@tanstack/react-query";

function GameCard({ product }) {
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

  const queryClient = useQueryClient();

  const { addItem, open, isCheckingStock } = useCart();

  const [selectedPlatform, setSelectedPlatform] = useState(platforms[0]);
  const isPurchasable = inStock && typeof price === "number" && price > 0;

  async function handleAddToCart() {
    if (!product) return;
    if (!isPurchasable) return;

    const newItem = { ...product, selectedPlatform };
    try {
      await addItem(newItem);

      console.log("Added to cart:", title, "on platform:", selectedPlatform);
      notifyAddedToCart(product.title, selectedPlatform, open);
    } catch (error) {
      notifyError("Could not add item to cart", error);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      if (product.slug) {
        queryClient.invalidateQueries({ queryKey: ["product", product.slug] });
      }
    }
  }

  return (
    <div className="bg-surface/20 grid grid-cols-1 gap-8 rounded-3xl p-8 shadow-2xl backdrop-blur-xl lg:grid-cols-2">
      <div className="overflow-hidden rounded-2xl border border-white/10 shadow-lg">
        <img
          src={image}
          alt={title}
          className={`h-full w-full object-cover transition-transform duration-500 hover:scale-105 ${!inStock && "grayscale"}`}
        />
      </div>

      <div className="flex flex-col items-center gap-4 text-white">
        <h1 className="text-4xl font-black tracking-tight uppercase">
          {title}
        </h1>

        <div className="h-px w-full bg-white/10" />

        <div className="mx-auto flex flex-wrap items-center justify-center gap-3">
          <div className="flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-bold tracking-wider uppercase">
            <Globe size={14} className="text-primary" /> {region}
          </div>

          <div
            className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase ${inStock ? "border-green-500/20 bg-green-500/10 text-green-500" : "border-red-500/20 bg-red-500/10 text-red-500"}`}
          >
            <CheckCircle size={14} /> {inStock ? "In Stock" : "Out of Stock"}
          </div>
          <div className="flex items-center gap-2 rounded-full border border-amber-500/20 bg-amber-500/10 px-4 py-1.5 text-xs font-bold tracking-wider text-amber-500 uppercase">
            <Star size={14} fill="currentColor" /> {rating}
          </div>
        </div>

        <div className="bg-background/60 flex items-center justify-center gap-3 rounded-3xl p-3">
          {discount >= 1 && (
            <div className="flex flex-col text-sm">
              <div className="text-gray-400 line-through">
                ${formatCurrency(originalPrice)}
              </div>
              <div className="rounded-full bg-emerald-500 p-1">
                -{discount}%
              </div>
            </div>
          )}
          <div className="text-2xl font-bold">${formatCurrency(price)}</div>
        </div>

        <Select label="Choose Platform" options={platforms}>
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
            onClick={() => handleAddToCart()}
          >
            <span>
              {isCheckingStock
                ? "Checking..."
                : isPurchasable
                  ? "Add To Cart"
                  : "Out of Stock"}
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default GameCard;
