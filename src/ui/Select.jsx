import { createContext, useContext } from "react";
import { cn } from "../utils/cn";

const SelectContext = createContext();

function Select({
  children,
  label = "choose",
  options = ["1", "2", "3"],
  className = "",
}) {
  return (
    <SelectContext.Provider value={{ label, options }}>
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
    <label
      className={cn(
        "text-primary text-sm font-bold tracking-widest uppercase",
        className,
      )}
    >
      {label}
    </label>
  );
}

function Content({ className, value, onChange }) {
  const { options } = useContext(SelectContext);

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
          key={o}
          className={cn("bg-background/60 text-white", className)}
        >
          {o}
        </option>
      ))}
    </select>
  );
}

Select.Label = Label;
Select.Content = Content;

export default Select;
