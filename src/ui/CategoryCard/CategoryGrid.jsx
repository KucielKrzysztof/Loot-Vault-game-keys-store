import CategoryCard from "./CategoryCard";

import { CATEGORIES } from "./assets/categoryData";

function CategoryGrid() {
  return (
    <section className="w-full px-2 py-8 sm:px-4">
      <div className="mb-4 flex items-center justify-between sm:mb-8">
        <h2 className="text-xl font-black tracking-tighter uppercase sm:text-3xl">
          Categories
        </h2>
        <button className="rounded-md bg-white/5 px-2 py-1 text-[10px] font-bold tracking-widest text-gray-400 uppercase transition-colors hover:text-white sm:px-4 sm:py-2 sm:text-xs">
          FIND MORE
        </button>
      </div>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-4 lg:gap-6">
        {CATEGORIES.map((cat) => (
          <CategoryCard
            key={cat.title}
            title={cat.title}
            bgImage={cat.bg}
            charImage={cat.char}
          />
        ))}
      </div>
    </section>
  );
}
export default CategoryGrid;
