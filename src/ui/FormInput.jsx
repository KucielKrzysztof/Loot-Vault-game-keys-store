function FormInput({ label, register, name, validation, error, ...props }) {
  return (
    <div className="flex w-full flex-col gap-1">
      {label && (
        <label className="ml-2 text-sm font-bold text-white/70 uppercase">
          {label}
        </label>
      )}
      <input
        {...register(name, validation)}
        {...props}
        className={`bg-background rounded-xl border ${error ? "border-red-500" : "border-white/10"} focus:border-primary px-4 py-3 transition-all outline-none`}
      />
      {error && (
        <span className="ml-2 text-xs font-medium text-red-500">
          {error.message}
        </span>
      )}
    </div>
  );
}
export default FormInput;
