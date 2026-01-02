import { cn } from "../utils/cn";

function Button({ variant = "", onClick, className = "", children, ...props }) {
  const variants = {
    primary:
      "bg-primary hover:bg-secondary rounded-full px-6 py-2  text-white transition-all duration-300 hover:cursor-pointer shadow-lg",
    secondary:
      "bg-white px-6 py-2 hover:bg-background rounded-full  text-black hover:text-white transition-all duration-300 shadow-xl ",
  };

  const variantClasses = variants[variant] || "";

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
