import { Skeleton } from "@/components/ui/skeleton";

export default function ServicesLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Hero Section Skeleton */}
          <section className="text-center mb-16">
            <Skeleton className="h-12 w-80 mx-auto mb-6" />
            <Skeleton className="h-6 w-96 mx-auto" />
          </section>

          {/* Services Grid Skeleton */}
          <section className="mb-16">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="space-y-4">
                  <Skeleton className="aspect-video w-full" />
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-6 w-6" />
                      <Skeleton className="h-6 w-32" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <div className="space-y-1">
                        {Array.from({ length: 3 }).map((_, j) => (
                          <div key={j} className="flex items-center gap-2">
                            <Skeleton className="h-4 w-4 rounded-full" />
                            <Skeleton className="h-4 w-32" />
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-6 w-20" />
                    </div>
                    <div className="flex gap-2">
                      <Skeleton className="h-10 flex-1" />
                      <Skeleton className="h-10 w-24" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Advantages Section Skeleton */}
          <section className="mb-16">
            <Skeleton className="h-8 w-64 mx-auto mb-12" />
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-12 w-12 mx-auto" />
                  <Skeleton className="h-5 w-32 mx-auto" />
                  <Skeleton className="h-4 w-40 mx-auto" />
                </div>
              ))}
            </div>
          </section>

          {/* Process Section Skeleton */}
          <section className="mb-16">
            <Skeleton className="h-8 w-48 mx-auto mb-12" />
            <div className="grid gap-8 md:grid-cols-4">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="text-center space-y-4">
                  <Skeleton className="h-12 w-12 rounded-full mx-auto" />
                  <Skeleton className="h-5 w-24 mx-auto" />
                  <Skeleton className="h-4 w-32 mx-auto" />
                </div>
              ))}
            </div>
          </section>

          {/* CTA Section Skeleton */}
          <section className="bg-muted rounded-lg p-8 text-center space-y-4">
            <Skeleton className="h-8 w-80 mx-auto" />
            <Skeleton className="h-5 w-96 mx-auto" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Skeleton className="h-12 w-48" />
              <Skeleton className="h-12 w-48" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
