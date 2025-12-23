import Button from "../../../ui/Button";
import Select from "../../../ui/Select";
import PriceRange from "./PriceRange";

function ProductsListFilterMobile() {
  return (
    <div className="bg-surface/80 col-span-3 flex flex-col gap-2 rounded-2xl px-5 py-4 backdrop-blur-2xl md:hidden">
      <div className="flex flex-row flex-wrap items-center justify-center">
        <Select
          label="Category"
          options={["action", "fantasy", "sports", "rpg"]}
        >
          <Select.Label />
          <Select.Content />
        </Select>
        <Select label="Platform" options={["steam", "xbox", "gog", "epic"]}>
          <Select.Label />
          <Select.Content />
        </Select>

        <PriceRange />
      </div>
      <Button variant="primary">Apply Filters</Button>
    </div>
  );
}

export default ProductsListFilterMobile;
