import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="container mx-auto py-8 flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
        <h3 className="text-xl font-medium">Loading templates...</h3>
        <p className="text-muted-foreground">Please wait while we fetch your templates</p>
      </div>
    </div>
  )
}
