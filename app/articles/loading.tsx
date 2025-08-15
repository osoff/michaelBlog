import { Skeleton } from "@/components/ui/skeleton";

export default function ArticlesLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header Skeleton */}
      <section className="py-12 md:py-20 bg-gradient-to-r from-primary/10 to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <Skeleton className="h-16 w-64 mx-auto mb-6" />
          <Skeleton className="h-6 w-96 mx-auto mb-8" />
        </div>
      </section>

      {/* Filter Skeleton */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="space-y-6">
            {/* Search Skeleton */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-10 shrink-0" />
            </div>

            {/* Categories Skeleton */}
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Posts Skeleton */}
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="space-y-4">
                <Skeleton className="aspect-video w-full" />
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-5 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-4 w-20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
