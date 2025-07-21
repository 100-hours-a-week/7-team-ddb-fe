export function MomentEditSkeleton() {
  return (
    <div className="overflow-y-auto pb-22">
      <div className="flex h-16 w-full items-center justify-between border-b border-b-gray-200 bg-white px-4">
        <div className="flex items-center">
          <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-8 w-8 animate-pulse rounded bg-gray-200" />
        </div>
      </div>
      <div className="space-y-6 p-4">
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="h-12 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-20 animate-pulse rounded bg-gray-200" />
          <div className="h-32 w-full animate-pulse rounded-lg bg-gray-200" />
        </div>
        <div className="space-y-2">
          <div className="h-4 w-16 animate-pulse rounded bg-gray-200" />
          <div className="grid grid-cols-3 gap-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="aspect-square animate-pulse rounded-lg bg-gray-200"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
