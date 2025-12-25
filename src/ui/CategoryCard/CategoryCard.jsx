import { Link } from "react-router-dom";

function CategoryCard({ title, bgImage, charImage, to }) {
  return (
    <Link
      to={to}
      className="group relative mt-4 mt-8 aspect-4/3 w-full cursor-pointer sm:mt-8"
    >
      {/* BG CONTAINER*/}
      <div className="bg-surface group-hover:border-primary/50 absolute bottom-0 h-[85%] w-full overflow-hidden rounded-2xl border border-white/5 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(134,91,206,0.2)]">
        {/* BG IMG */}
        <img
          src={bgImage}
          alt=""
          className="h-full w-full object-cover opacity-40 transition-transform duration-500 group-hover:scale-110"
        />
        {/* OVERLAY GRADIENT*/}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

        {/* TITLE*/}
        <span className="xs:text-xs absolute top-1/2 left-2 -translate-y-1/2 text-[10px] leading-none font-black tracking-tighter text-white uppercase italic sm:left-4 sm:text-lg lg:left-6 lg:text-2xl">
          {title}
        </span>
      </div>

      {/* CHARACTER IMG */}
      <img
        src={charImage}
        alt=""
        className="pointer-events-none absolute right-0 bottom-0 h-full w-auto object-contain transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-105"
      />
    </Link>
  );
}
export default CategoryCard;
