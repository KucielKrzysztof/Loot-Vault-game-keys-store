import { Info } from "lucide-react";

function GameAbout({ product, setShowDescription, showDescription }) {
  const { description, genre } = product;

  const displayDescription = showDescription
    ? description
    : description.split(" ").slice(0, 40).join(" ") + "...";

  return (
    <>
      <div className="grid grid-cols-1 py-5 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="mb-6 flex items-center gap-3">
            <div className="bg-primary h-8 w-1 rounded-full" />
            <h2 className="text-3xl font-black uppercase">About the game</h2>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="text-left">{displayDescription} </div>
            <button
              onClick={() => setShowDescription((prev) => !prev)}
              className="text-primary hover:text-secondary transition-colors"
            >
              {showDescription ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        <div className="bg-surface/30 h-fit rounded-3xl border border-white/5 p-8">
          <h2 className="mb-6 flex items-center justify-center gap-2 text-xl font-bold tracking-tighter uppercase">
            <Info size={20} className="text-primary" /> Genres
          </h2>
          <div className="flex items-center justify-center gap-3">
            {genre.map((g) => (
              <div
                key={g}
                className="hover:bg-primary/20 cursor-default rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold transition-colors"
              >
                {g}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="h-px w-full bg-white/10" />
    </>
  );
}

export default GameAbout;
