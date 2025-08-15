import { Skeleton } from "@/components/ui/skeleton";

export default function BlogLoading() {
  return (
    <div className="min-h-screen bg-background">
      <main className="py-12">
        <div className="container mx-auto px-4">
          {/* Post Header Skeleton */}
          <div className="max-w-4xl mx-auto mb-12">
            <Skeleton className="h-12 w-full mb-6" />
            <Skeleton className="h-6 w-3/4 mb-4" />
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-10 w-10 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-24" />
              </div>
            </div>
            <div className="flex gap-2 mb-8">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>

          {/* Post Image Skeleton */}
          <div className="max-w-4xl mx-auto mb-12">
            <Skeleton className="aspect-video w-full" />
          </div>

          {/* Post Content Skeleton */}
          <div className="max-w-4xl mx-auto space-y-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="space-y-3">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
                <Skeleton className="h-4 w-4/5" />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
