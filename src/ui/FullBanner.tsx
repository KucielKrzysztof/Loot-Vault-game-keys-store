import type { ReactNode } from "react";
import { cn } from "../utils/cn";

/* TYPES */

interface FullBannerProps {
  children: ReactNode;
  className?: string;
}

interface BannerImageProps {
  src: string;
  alt: string;
  className?: string;
}

interface BannerOverlayProps {
  className?: string;
}

interface BannerContentProps {
  children: ReactNode;
  className?: string;
}

function FullBanner({
  children,
  className = "h-100 md:h-150 overflow-hidden bg-neutral-900",
}: FullBannerProps): React.JSX.Element {
  return (
    <section className={cn("relative w-full", className)}>{children}</section>
  );
}

function BannerImage({ src, alt, className }: BannerImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
    />
  );
}

function BannerOverlay({ className = "bg-black/50" }: BannerOverlayProps) {
  return <div className={cn("absolute inset-0", className)} />;
}

function BannerContent({
  children,
  className = "items-start justify-center",
}: BannerContentProps) {
  return (
    <div
      className={cn(
        "relative mx-auto flex h-full max-w-7xl flex-col px-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

FullBanner.Image = BannerImage;
FullBanner.Overlay = BannerOverlay;
FullBanner.Content = BannerContent;

export default FullBanner;
