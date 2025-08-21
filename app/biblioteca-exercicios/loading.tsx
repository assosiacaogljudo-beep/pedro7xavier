import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto py-6 px-4">
      <Skeleton className="h-10 w-64 bg-purple-800/30 mb-6" />

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <Skeleton className="h-10 flex-1 bg-purple-800/30" />
        <div className="flex gap-2">
          <Skeleton className="h-10 w-[180px] bg-purple-800/30" />
          <Skeleton className="h-10 w-[180px] bg-purple-800/30" />
          <Skeleton className="h-10 w-[180px] bg-purple-800/30" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array(6)
          .fill(0)
          .map((_, i) => (
            <div key={i} className="border border-purple-800 rounded-lg p-4 bg-[#2a1f3d]">
              <div className="flex justify-between items-start mb-2">
                <Skeleton className="h-6 w-40 bg-purple-800/30" />
                <Skeleton className="h-5 w-20 bg-purple-800/30" />
              </div>
              <Skeleton className="h-4 w-32 bg-purple-800/30 mb-4" />
              <div className="flex gap-1 mb-4">
                <Skeleton className="h-5 w-16 bg-purple-800/30" />
                <Skeleton className="h-5 w-16 bg-purple-800/30" />
                <Skeleton className="h-5 w-16 bg-purple-800/30" />
              </div>
              <Skeleton className="h-4 w-full bg-purple-800/30 mb-2" />
              <Skeleton className="h-4 w-3/4 bg-purple-800/30 mb-4" />
              <div className="flex justify-between">
                <Skeleton className="h-8 w-24 bg-purple-800/30" />
                <Skeleton className="h-8 w-24 bg-purple-800/30" />
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}
