import Button from "../../../ui/Button";

function AuthForm({
  onSubmit,
  title,
  isLoading,
  children,
  buttonLabel,
  footer,
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-surface mx-auto flex max-w-md flex-col gap-4 rounded-3xl border border-white/10 p-8 shadow-2xl"
    >
      <h2 className="mb-4 text-center text-2xl font-black uppercase">
        {title}
      </h2>

      {children}

      <Button
        variant="primary"
        disabled={isLoading}
        className="mt-2 font-black uppercase"
      >
        {isLoading ? "Processing..." : buttonLabel}
      </Button>
      {footer && <div className="mt-2 text-center text-sm">{footer}</div>}
    </form>
  );
}

export default AuthForm;
