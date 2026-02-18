import { Card, CardContent } from "@/components/ui/card";

export function ComparisonSkeleton() {
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <Card>
          <CardContent className="p-6">
            <div className="overflow-x-auto">
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="h-12 w-32 bg-muted rounded shrink-0" />
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-full bg-muted rounded" />
                      <div className="h-4 w-2/3 bg-muted rounded" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
