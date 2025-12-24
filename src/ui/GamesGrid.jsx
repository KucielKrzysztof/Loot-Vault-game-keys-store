import { ChevronRight } from "lucide-react";
import { createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

const GamesContext = createContext();

function GamesGrid({ children, games, isLoading }) {
  return (
    <GamesContext.Provider value={{ games, isLoading }}>
      <div className="flex flex-col justify-center gap-4 py-5">{children}</div>
    </GamesContext.Provider>
  );
}

function GamesHeader({ children, to }) {
  return (
    <Link
      to={to}
      className="group hover:text-primary flex max-w-50 items-center gap-1 text-2xl leading-none font-bold transition-colors duration-300"
    >
      <span className="inline-block">{children}</span>
      <ChevronRight
        size={22}
        className="translate-y-[2px] transition-transform group-hover:translate-x-1"
      />
    </Link>
  );
}

function GamesList() {
  const { games, isLoading } = useContext(GamesContext);

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

function GamesItem({ game }) {
  const navigate = useNavigate();

  const { title, slug, price, originalPrice, discount, image } = game;
  return (
    <div className="bg-surface flex flex-col rounded-2xl p-2">
      <div className="aspect-16:9 group relative rounded-xl">
        <img
          src={image}
          alt={title}
          className="h-full w-full overflow-hidden rounded-2xl object-cover transition-all duration-200 hover:scale-110 hover:cursor-pointer"
          onClick={() => {
            navigate(`/product/${slug}`);
          }}
        />
        {discount > 0 && (
          <span className="bg-secondary transform-all pointer-events-none absolute bottom-1 left-1 rounded-2xl px-2 py-1 text-xs font-bold text-white opacity-100 duration-200 group-hover:translate-y-2 group-hover:opacity-0">
            -{discount}%
          </span>
        )}
      </div>

      <div className="flex items-center justify-between px-1 py-3">
        <span className="sm:text-md truncate text-[13px]">{title}</span>
        <span className="text-secondary flex items-center gap-1 text-sm md:text-lg">
          {discount > 0 && (
            <span className="text-[11px] text-gray-400 line-through md:text-sm">
              ${formatCurrency(originalPrice)}
            </span>
          )}
          <strong>${formatCurrency(price)}</strong>
        </span>
      </div>
    </div>
  );
}

function GamesSkeleton() {
  return (
    <div className="bg-surface flex animate-pulse flex-col rounded-2xl p-2">
      <div className="bg-secondary/20 aspect-video w-full rounded-2xl" />
      <div className="flex items-center justify-between gap-4 px-1 py-3">
        <div className="bg-secondary/20 h-4 w-2/3 rounded-full" />
        <div className="bg-secondary/20 h-6 w-1/4 rounded-full" />
      </div>
    </div>
  );
}

GamesGrid.Header = GamesHeader;
GamesGrid.List = GamesList;
GamesGrid.Item = GamesItem;

export default GamesGrid;
