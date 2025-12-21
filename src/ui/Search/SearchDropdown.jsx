import { productList } from "../../assets/mockdata";
import SearchItem from "./SearchItem";

function SearchDropdown({ /* results, isPending, error, */ onSelect }) {
  const results = productList;

  /* if is Pending return <COntainer>bla bla bla </COntainer> */

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
        {results.map((i) => (
          <SearchItem
            key={i.id}
            title={i.title}
            slug={i.slug}
            price={i.price}
            image={i.image}
            onSelect={onSelect}
          />
        ))}
      </div>
    </Container>
  );
}

const Container = ({ children }) => (
  <div className="bg-surface animate-in fade-in slide-in-from-top-3 absolute top-full z-50 max-h-[550px] w-full overflow-hidden overflow-y-scroll rounded-b-3xl border-x border-b border-white/10 shadow-2xl duration-500">
    {children}
  </div>
);

export default SearchDropdown;
