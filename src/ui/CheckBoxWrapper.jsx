import CheckBox from "./Checkbox";

function CheckBoxWrapper({ id, label, checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <CheckBox id={id} checked={checked} onChange={onChange} />
      <label htmlFor={id} className="font-semibold">
        {label || id}
      </label>
    </div>
  );
}

export default CheckBoxWrapper;
