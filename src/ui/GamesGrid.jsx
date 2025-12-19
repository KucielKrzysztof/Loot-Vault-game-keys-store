import { ChevronRight } from "lucide-react";
import { createContext, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatCurrency } from "../utils/formatters";

const GamesContext = createContext();

function GamesGrid({ children, games, isLoading }) {
	return (
		<GamesContext.Provider value={{ games, isLoading }}>
			<div className="flex flex-col  justify-center gap-4 py-5">{children}</div>
		</GamesContext.Provider>
	);
}

function GamesHeader({ children, to }) {
	return (
		<Link
			to={to}
			className="max-w-50 flex items-center gap-1 text-2xl font-bold leading-none transition-colors group duration-300 hover:text-primary  "
		>
			<span className="inline-block">{children}</span>
			<ChevronRight size={22} className="translate-y-[2px] transition-transform group-hover:translate-x-1 " />
		</Link>
	);
}

function GamesList() {
	const { games, isLoading } = useContext(GamesContext);

	if (isLoading) {
		return (
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				{[...Array(8)].map((_, i) => (
					<GamesSkeleton key={i} />
				))}
			</div>
		);
	}

	if (!games?.length) return <p className="text-center opacity-50">No keys available...</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 ">
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
		<div className="flex flex-col p-2 rounded-2xl bg-surface ">
			<div className="relative  rounded-xl aspect-16:9 group">
				<img
					src={image}
					alt={title}
					className="w-full h-full overflow-hidden object-cover rounded-2xl transition-all duration-200 hover:scale-110 hover:cursor-pointer "
					onClick={() => {
						navigate(`/product/${slug}`);
					}}
				/>
				{discount > 0 && (
					<span className="absolute opacity-100 bottom-1 left-1 bg-secondary text-white text-xs font-bold px-2 py-1 rounded-2xl transform-all duration-200 group-hover:opacity-0 group-hover:translate-y-2 pointer-events-none">
						-{discount}%
					</span>
				)}
			</div>

			<div className="flex justify-between items-center py-3 px-1">
				<span className="truncate text-[13px] sm:text-md">{title}</span>
				<span className="text-sm md:text-lg text-secondary flex gap-1 items-center">
					{discount > 0 && <sm className="text-[11px] md:text-sm text-gray-400 line-through">${formatCurrency(originalPrice)}</sm>}
					<strong>${formatCurrency(price)}</strong>
				</span>
			</div>
		</div>
	);
}

function GamesSkeleton() {
	return (
		<div className="flex flex-col p-2 rounded-2xl bg-surface animate-pulse">
			<div className="w-full aspect-video bg-secondary/20 rounded-2xl" />
			<div className="flex justify-between items-center py-4 px-1 gap-4">
				<div className="h-4 bg-secondary/20 rounded-full w-2/3" />
				<div className="h-6 bg-secondary/20 rounded-full w-1/4" />
			</div>
		</div>
	);
}

GamesGrid.Header = GamesHeader;
GamesGrid.List = GamesList;
GamesGrid.Item = GamesItem;

export default GamesGrid;
