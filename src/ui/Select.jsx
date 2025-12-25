import { createContext, useContext } from "react";
import { cn } from "../utils/cn";

const SelectContext = createContext();

function Select({
  children,
  label = "choose",
  options = ["one", "two", "three"],
  className = "",
}) {
  const normalizedOptions = options.map((opt) => {
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

function Label({ className }) {
  const { label } = useContext(SelectContext);
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

function Content({ className, onChange }) {
  const { options } = useContext(SelectContext);

  return (
    <select
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
