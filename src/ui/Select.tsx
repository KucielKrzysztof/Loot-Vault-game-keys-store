import {
  createContext,
  useContext,
  type ReactNode,
  type ChangeEventHandler,
} from "react";
import { cn } from "../utils/cn";

interface OptionObject {
  value: string;
  name: string;
}

type RawOption = string | OptionObject;

interface SelectContextType {
  label: ReactNode;
  options: OptionObject[];
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

function useSelectContext() {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error(
      "Select compound components must be used within a <Select />",
    );
  }
  return context;
}

interface SelectProps {
  children: ReactNode;
  label?: ReactNode;
  options?: RawOption[];
  className?: string;
}

function Select({
  children,
  label = "choose",
  options = ["one", "two", "three"],
  className = "",
}: SelectProps) {
  const normalizedOptions: OptionObject[] = options.map((opt) => {
    if (typeof opt === "string") {
      return { value: opt, name: opt };
    }
    return opt;
  });

  return (
    <SelectContext.Provider value={{ label, options: normalizedOptions }}>
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-2 p-3",
          className,
        )}
      >
        {children}
      </div>
    </SelectContext.Provider>
  );
}

/* SUB-COMPONENTS */
interface SubComponentProps {
  className?: string;
}

function Label({ className }: SubComponentProps) {
  const { label } = useSelectContext();
  if (!label) return null;
  return (
    <div
      className={cn(
        "text-primary text-sm font-bold tracking-widest uppercase",
        className,
      )}
    >
      {label}
    </div>
  );
}

interface ContentProps extends SubComponentProps {
  value?: string | number;
  onChange?: ChangeEventHandler<HTMLSelectElement>;
}

function Content({ className, onChange, value }: ContentProps) {
  const { options } = useSelectContext();

  return (
    <select
      value={value}
      onChange={onChange}
      className={cn(
        "bg-background/60 hover:border-primary/50 focus:border-primary w-full cursor-pointer rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-white capitalize transition-all outline-none",
        className,
      )}
    >
      {options.map((o) => (
        <option
          key={o.value}
          value={o.value}
          className={cn("bg-background/60 text-white", className)}
        >
          {o.name}
        </option>
      ))}
    </select>
  );
}

Select.Label = Label;
Select.Content = Content;

export default Select;
