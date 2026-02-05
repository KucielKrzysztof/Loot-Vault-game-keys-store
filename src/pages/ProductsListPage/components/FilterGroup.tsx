import type { ReactNode } from "react";

interface FilterGroupProps<T> {
  title: string;
  items: T[];
  render: (item: T) => ReactNode;
}

function FilterGroup<T>({
  title,
  items,
  render,
}: FilterGroupProps<T>): React.JSX.Element {
  return (
    <div>
      <h2 className="mb-4 text-xs font-bold tracking-widest text-white uppercase opacity-50">
        {title}
      </h2>
      <div className="flex flex-col gap-2">
        {items ? items.map((item) => render(item)) : null}
      </div>
    </div>
  );
}

export default FilterGroup;
