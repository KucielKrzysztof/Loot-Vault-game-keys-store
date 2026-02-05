import {
  createContext,
  useContext,
  useState,
  useId,
  type ReactNode,
} from "react";
import { ChevronDown } from "lucide-react";

/* TYPES */
interface AccordionContextType {
  openItems: string[];
  toggleItem: (id: string) => void;
}

interface ItemContextType {
  id: string;
}

/* Create COntext's */
const AccordionContext = createContext<AccordionContextType | undefined>(
  undefined,
);
const ItemContext = createContext<ItemContextType | undefined>(undefined);

/* Helper hooks for useContext */
function useAccordion() {
  const context = useContext(AccordionContext);
  if (!context)
    throw new Error("Accordion components must be used within <Accordion />");
  return context;
}

function useItem() {
  const context = useContext(ItemContext);
  if (!context)
    throw new Error(
      "Accordion.Item components must be used within <Accordion.Item />",
    );
  return context;
}

/* Components */

interface AccordionProps {
  children: ReactNode;
  allowMultiple?: boolean;
  className?: string;
}

function Accordion({
  children,
  allowMultiple = false,
  className = "",
}: AccordionProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  function toggleItem(id: string) {
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

/* Sub-Components */

interface ItemProps {
  children: ReactNode;
  className?: string;
}

function Item({ children, className = "" }: ItemProps) {
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

function Header({ children }: { children: ReactNode }) {
  const { openItems, toggleItem } = useAccordion();
  const { id } = useItem();
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

function Content({ children }: { children: ReactNode }) {
  const { openItems } = useAccordion();
  const { id } = useItem();
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
