import { cn } from "../utils/cn";

type PageSectionProps = React.HTMLAttributes<HTMLElement>;

function PageSection({ children, className = "" }: PageSectionProps) {
  return (
    <section
      className={cn("mx-auto w-full max-w-400 px-6 md:px-12", className)}
    >
      {children}
    </section>
  );
}

export default PageSection;
