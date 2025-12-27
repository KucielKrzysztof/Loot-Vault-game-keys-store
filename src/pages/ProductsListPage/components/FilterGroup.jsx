function FilterGroup({ title, items, render }) {
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
