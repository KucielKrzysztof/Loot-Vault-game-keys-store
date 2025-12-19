import { createContext, useContext, useState, useId } from "react";
import { ChevronDown } from "lucide-react";

const AccordionContext = createContext();
const ItemContext = createContext();

function Accordion({ children, allowMultiple = false, className = "" }) {
  const [openItems, setOpenItems] = useState([]);

  function toggleItem(id) {
    setOpenItems((prev) => {
      if (allowMultiple) {
        return prev.includes(id)
          ? prev.filter((item) => item !== id)
          : [...prev, id];
      }
      return prev.includes(id) ? [] : [id];
    });
  }

  return (
    <AccordionContext.Provider value={{ openItems, toggleItem }}>
      <div className={`flex w-full flex-col gap-2 ${className}`}>
        {children}
      </div>
    </AccordionContext.Provider>
  );
}

function Item({ children, className = "" }) {
  const id = useId();
  return (
    <ItemContext.Provider value={{ id }}>
      <div
        className={`bg-surface overflow-hidden rounded-xl border border-white/10 ${className}`}
      >
        {children}
      </div>
    </ItemContext.Provider>
  );
}

function Header({ children }) {
  const { openItems, toggleItem } = useContext(AccordionContext);
  const { id } = useContext(ItemContext);
  const isOpen = openItems.includes(id);

  return (
    <button
      onClick={() => toggleItem(id)}
      className="flex w-full cursor-pointer items-center justify-between p-4 text-left font-bold text-white transition-colors hover:bg-white/5"
    >
      {children}
      <ChevronDown
        className={`transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
      />
    </button>
  );
}

function Content({ children }) {
  const { openItems } = useContext(AccordionContext);
  const { id } = useContext(ItemContext);
  const isOpen = openItems.includes(id);

  return (
    <div
      className={`grid transition-all duration-300 ease-in-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
    >
      <div className="overflow-hidden">
        <div className="p-4 pt-0 text-left leading-relaxed text-gray-400">
          {children}
        </div>
      </div>
    </div>
  );
}

Accordion.Item = Item;
Accordion.Header = Header;
Accordion.Content = Content;

export default Accordion;
