import Skeleton from "../../../ui/Skeleton";

function OrderCardSkeleton() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:p-6 lg:p-12">
      <h1 className="mb-6 text-xl font-black text-white uppercase italic sm:mb-10 sm:text-2xl">
        My <span className="text-primary">Vault</span>
      </h1>
      <div className="bg-surface max-w-3xl space-y-6 rounded-3xl border border-white/10 p-6">
        <div className="flex justify-between border-b border-white/5 pb-4">
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-4 w-48" />
          </div>
          <div className="space-y-2 text-right">
            <Skeleton className="ml-auto h-3 w-16" />
            <Skeleton className="ml-auto h-6 w-20" />
          </div>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      </div>
    </div>
  );
}

export default OrderCardSkeleton;
