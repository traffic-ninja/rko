import { Card, CardContent } from "@/components/ui/card";

export function BlogPostSkeleton() {
  return (
    <Card className="animate-pulse overflow-hidden">
      <div className="aspect-video bg-muted" />
      <CardContent className="p-5 space-y-3">
        <div className="h-5 w-20 bg-muted rounded" />
        <div className="space-y-2">
          <div className="h-5 w-full bg-muted rounded" />
          <div className="h-5 w-3/4 bg-muted rounded" />
        </div>
        <div className="space-y-1">
          <div className="h-3 w-full bg-muted rounded" />
          <div className="h-3 w-2/3 bg-muted rounded" />
        </div>
        <div className="flex items-center gap-4 pt-2">
          <div className="h-3 w-20 bg-muted rounded" />
          <div className="h-3 w-16 bg-muted rounded" />
        </div>
      </CardContent>
    </Card>
  );
}

export function BlogSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, i) => (
        <BlogPostSkeleton key={i} />
      ))}
    </div>
  );
}
