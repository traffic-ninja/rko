import { Card, CardContent } from "@/components/ui/card";

export function PromotionSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <div className="h-12 w-12 rounded-lg bg-muted shrink-0" />
          <div className="flex-1 space-y-2">
            <div className="h-4 w-20 bg-muted rounded" />
            <div className="h-5 w-3/4 bg-muted rounded" />
            <div className="h-4 w-1/2 bg-muted rounded" />
          </div>
        </div>
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-muted rounded" />
          <div className="h-4 w-2/3 bg-muted rounded" />
        </div>
        <div className="h-10 w-full bg-muted rounded" />
      </CardContent>
    </Card>
  );
}

export function PromotionsSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <PromotionSkeleton key={i} />
      ))}
    </div>
  );
}
