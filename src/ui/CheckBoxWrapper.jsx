import CheckBox from "./Checkbox";

function CheckBoxWrapper({ id }) {
  return (
    <div className="flex items-center gap-2">
      <CheckBox id={id} />
      <label for={id} className="capitalize">
        {id}
      </label>
    </div>
  );
}

export default CheckBoxWrapper;
