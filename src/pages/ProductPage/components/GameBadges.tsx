import { CheckCircle, Globe, Star } from "lucide-react";
import type { ReactNode } from "react";

type BadgeVariant = "default" | "success" | "error" | "warning";

interface GameBadgesProps {
  region: string;
  inStock: boolean;
  rating: number;
}

interface BadgeProps {
  icon: ReactNode;
  label: string | number;
  variant?: BadgeVariant;
}

export function GameBadges({
  region,
  inStock,
  rating,
}: GameBadgesProps): React.JSX.Element {
  return (
    <div className="mx-auto flex flex-wrap justify-center gap-3">
      <Badge icon={<Globe size={14} />} label={region} />
      <Badge
        icon={<CheckCircle size={14} />}
        label={inStock ? "In Stock" : "Out of Stock"}
        variant={inStock ? "success" : "error"}
      />
      <Badge
        icon={<Star size={14} fill="currentColor" />}
        label={rating}
        variant="warning"
      />
    </div>
  );
}

function Badge({
  icon,
  label,
  variant = "default",
}: BadgeProps): React.JSX.Element {
  const styles = {
    default: "border-white/10 bg-white/5 text-white",
    success: "border-green-500/20 bg-green-500/10 text-green-500",
    error: "border-red-500/20 bg-red-500/10 text-red-500",
    warning: "border-amber-500/20 bg-amber-500/10 text-amber-500",
  };
  return (
    <div
      className={`flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-bold tracking-wider uppercase ${styles[variant]}`}
    >
      {icon} {label}
    </div>
  );
}
