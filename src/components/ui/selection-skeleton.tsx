import { Card, CardContent } from "@/components/ui/card";

export function SelectionSkeleton() {
  return (
    <div className="container-custom py-8 md:py-12">
      <div className="space-y-6">
        <div className="space-y-2">
          <div className="h-8 w-64 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
        <Card>
          <CardContent className="p-6 space-y-6">
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
            <div className="space-y-2">
              <div className="h-4 w-32 bg-muted rounded" />
              <div className="h-10 w-full bg-muted rounded" />
            </div>
            <div className="h-12 w-48 bg-muted rounded" />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
