function CheckBox({ id, checked, onChange }) {
  return (
    <input
      type="checkbox"
      id={id}
      checked={checked}
      onChange={onChange}
      className="checked:bg-primary relative size-4 cursor-pointer appearance-none rounded border border-white/20 bg-white/5 transition-all after:absolute after:top-1/2 after:left-1/2 after:hidden after:-translate-x-1/2 after:-translate-y-1/2 after:text-[10px] after:text-white after:content-['✓'] checked:border-transparent checked:after:block"
    />
  );
}

export default CheckBox;
