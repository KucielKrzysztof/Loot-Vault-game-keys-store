import { cn } from "../utils/cn";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "";
  children: React.ReactNode;
}

function Button({
  variant = "",
  onClick,
  className = "",
  children,
  ...props
}: ButtonProps) {
  const variants = {
    primary:
      "bg-primary hover:bg-secondary rounded-full px-6 py-2  text-white transition-all duration-300 hover:cursor-pointer shadow-lg",
    secondary:
      "bg-white px-6 py-2 hover:bg-white/10 rounded-full  text-black hover:text-white transition-all duration-300 shadow-xl ",
  };

  const variantClasses = variant
    ? variants[variant as keyof typeof variants]
    : "";

  return (
    <button
      onClick={onClick}
      className={cn(variantClasses, className)}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
