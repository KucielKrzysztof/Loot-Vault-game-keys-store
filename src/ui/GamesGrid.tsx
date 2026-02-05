import { ChevronRight } from "lucide-react";
import { createContext, useContext, type ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";
import Skeleton from "./Skeleton";

/* TYPES */
export interface Game {
  id: number | string;
  title: string;
  slug: string;
  price: number;
  original_price: number | null;
  discount: number | null;
  image: string | null;
  in_stock: boolean | null;
}

interface GamesContextType {
  games: Game[] | undefined;
  isLoading: boolean;
}

interface GamesGridProps {
  children: ReactNode;
  games: Game[] | undefined;
  isLoading: boolean;
}

/* Context */

const GamesContext = createContext<GamesContextType | undefined>(undefined);

/* Helper hook for context */
function useGames() {
  const context = useContext(GamesContext);
  if (!context)
    throw new Error("GamesGrid components must be used within <GamesGrid />");
  return context;
}

/* COMPONENTS */

function GamesGrid({ children, games, isLoading }: GamesGridProps) {
  return (
    <GamesContext.Provider value={{ games, isLoading }}>
      <div className="flex flex-col justify-center gap-4 py-5">{children}</div>
    </GamesContext.Provider>
  );
}

function GamesHeader({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Link
      to={to}
      className="group hover:text-primary flex max-w-50 items-center gap-1 text-2xl leading-none font-bold transition-colors duration-300"
    >
      <span className="inline-block">{children}</span>
      <ChevronRight
        size={22}
        className="translate-y-0.5 transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function GamesList() {
  const { games, isLoading } = useGames();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[...Array(8)].map((_, i) => (
          <GamesSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (!games?.length)
    return <p className="text-center opacity-50">No keys available...</p>;

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {games.map((game) => (
        <GamesItem game={game} key={game.id} />
      ))}
    </div>
  );
}

function GamesItem({ game }: { game: Game }) {
  const navigate = useNavigate();

  const {
    title,
    slug,
    price,
    original_price: originalPrice,
    discount,
    image,
    in_stock,
  } = game;

  const hasDiscount = (discount ?? 0) > 0;
  const inStock = in_stock ?? false;
  const displayImg = image ?? "/vault_logo.png";

  return (
    <div className="bg-surface flex flex-col rounded-2xl p-2">
      <div className="aspect-16:9 group relative rounded-xl">
        <img
          src={displayImg}
          alt={title}
          loading="lazy"
          className={`h-full w-full overflow-hidden rounded-2xl object-cover transition-all duration-200 hover:scale-110 hover:cursor-pointer ${!inStock && "grayscale"}`}
          onClick={() => {
            navigate(`/product/${slug}`);
          }}
        />

        {hasDiscount && inStock && (
          <span className="bg-secondary transform-all pointer-events-none absolute bottom-1 left-1 rounded-2xl px-2 py-1 text-xs font-bold text-white opacity-100 duration-200 group-hover:translate-y-2 group-hover:opacity-0">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex w-full min-w-0 flex-col items-center justify-between px-1 py-3">
        <div
          className={`sm:text-md w-full truncate text-[13px] ${!inStock && "opacity-50"}`}
        >
          {title}
        </div>

        <div className="flex items-center gap-1 text-sm md:text-lg">
          {inStock ? (
            <div className="text-secondary flex items-center gap-1">
              {hasDiscount && originalPrice && (
                <span className="text-[11px] text-gray-400 line-through md:text-sm">
                  ${formatCurrency(originalPrice)}
                </span>
              )}
              <strong>${formatCurrency(price)}</strong>
            </div>
          ) : (
            <span className="text-xs font-bold tracking-wider text-red-500 uppercase md:text-sm">
              Out of stock
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

function GamesSkeleton() {
  return (
    <div className="bg-surface flex flex-col rounded-2xl p-2">
      <Skeleton className="h-20 w-full" />
      <div className="flex items-center justify-between gap-4 px-1 py-3">
        <Skeleton className="h-4 w-2/3 rounded-full" />
        <Skeleton className="h-6 w-1/4 rounded-full" />
      </div>
    </div>
  );
}

GamesGrid.Header = GamesHeader;
GamesGrid.List = GamesList;
GamesGrid.Item = GamesItem;

export default GamesGrid;
