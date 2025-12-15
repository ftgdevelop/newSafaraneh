export default function AccommodationItemSkeleton() {
  return (
    <div className="bg-white rounded-2xl overflow-hidden border border-neutral-200">
      <div className="w-full h-40 bg-gray-200 animate-pulse" />

      <div className="p-3 space-y-3">
        <div className="h-4 w-3/4 bg-gray-200 rounded-md animate-pulse" />

        <div className="h-3 w-1/2 bg-gray-200 rounded-md animate-pulse" />

        <div className="mt-4 space-y-2">
          <div className="h-3 w-1/3 bg-gray-200 rounded-md animate-pulse" />

          <div className="h-4 w-1/2 bg-gray-300 rounded-md animate-pulse" />

          <div className="h-3 w-2/3 bg-gray-200 rounded-md animate-pulse" />
        </div>
      </div>
    </div>
  );
}
