import { KanbanBoard } from "@/components/kanban-board";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

type Params = Promise<{ packageId: string }>;

export default async function TemplatesPage({ params }: { params: Params }) {
  const { packageId } = await params;

  return (
    <div className="container mx-auto py-6 px-4 max-w-full">
      <div className="flex items-center mb-6">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/admin/packages">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Packages
          </Link>
        </Button>
        <h1 className="text-2xl font-bold">{packageId} Templates</h1>
      </div>

      <KanbanBoard packageId={packageId} />
    </div>
  );
}
