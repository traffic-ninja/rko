import { Card, CardContent } from "@/components/ui/card";

export function BankSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-lg bg-muted shrink-0" />
          <div className="flex-1 min-w-0 space-y-2">
            <div className="h-5 w-3/4 bg-muted rounded" />
            <div className="flex items-center gap-2">
              <div className="h-4 w-16 bg-muted rounded" />
            </div>
            <div className="space-y-1">
              <div className="h-3 w-full bg-muted rounded" />
              <div className="h-3 w-2/3 bg-muted rounded" />
            </div>
            <div className="flex items-center justify-between pt-2">
              <div className="space-y-1">
                <div className="h-4 w-20 bg-muted rounded" />
                <div className="h-3 w-16 bg-muted rounded" />
              </div>
              <div className="h-8 w-24 bg-muted rounded" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export function BanksSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <BankSkeleton key={i} />
      ))}
    </div>
  );
}
