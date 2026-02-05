import Skeleton from "../../../ui/Skeleton";
import PageSection from "../../../ui/PageSection";

function ProductPageSkeleton(): React.JSX.Element {
  return (
    <div className="bg-background relative h-full w-full">
      {/* Banner Skeleton */}
      <div className="absolute inset-0 z-0 h-125 w-full lg:h-150">
        <Skeleton className="h-full w-full rounded-none opacity-20" />
      </div>

      <div className="relative z-10 space-y-20 pt-50">
        {/* GameCard Skeleton */}
        <PageSection>
          <div className="bg-surface/20 grid grid-cols-1 gap-8 rounded-3xl p-8 lg:grid-cols-2">
            <Skeleton className="aspect-4/3 w-full lg:h-[400px]" />
            <div className="flex flex-col gap-6">
              <Skeleton className="h-12 w-3/4" />
              <div className="flex justify-center gap-3">
                <Skeleton className="h-8 w-24 rounded-full" />
                <Skeleton className="h-8 w-24 rounded-full" />
              </div>
              <Skeleton className="h-16 w-full" />
              <Skeleton className="mx-auto h-14 w-1/2" />
            </div>
          </div>
        </PageSection>

        {/* GameAbout Skeleton */}
        <PageSection>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            <div className="space-y-4 md:col-span-2">
              <Skeleton className="h-8 w-48" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
            <Skeleton className="h-48 w-full rounded-3xl" />
          </div>
        </PageSection>
      </div>
    </div>
  );
}
export default ProductPageSkeleton;
