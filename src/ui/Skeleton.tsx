import { cn } from "../utils/cn";

type SkeletonProps = React.HTMLAttributes<HTMLDivElement>;

function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn("animate-pulse rounded-xl bg-white/5", className)} />
  );
}

export default Skeleton;
