import SearchItem from "./SearchItem";

function SearchDropdown({ results, isPending, error, onSelect }) {
  if (isPending) {
    return (
      <Container>
        <div className="animate-pulse p-8 text-center text-sm text-gray-500">
          Loading vault...
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <div className="p-8 text-center text-sm text-red-500">
          Error loading vault, try again later...
        </div>
      </Container>
    );
  }

  if (results.length === 0) {
    return (
      <Container>
        <div className="p-8 text-center text-sm text-gray-500">
          No games found in the vault. 🕸️
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <div className="flex flex-col gap-1">
        {results?.map((i) => (
          <SearchItem
            key={i.id}
            title={i.title}
            slug={i.slug}
            price={i.price}
            originalPrice={i.original_price}
            image={i.image}
            onSelect={onSelect}
          />
        ))}
      </div>
    </Container>
  );
}

const Container = ({ children }) => (
  <div className="bg-surface animate-in fade-in slide-in-from-top-3 absolute top-full z-50 max-h-[550px] w-full overflow-hidden overflow-y-scroll rounded-b-3xl border-x border-b border-white/10 pb-3 shadow-2xl duration-500">
    {children}
  </div>
);

export default SearchDropdown;
