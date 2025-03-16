import { TemplateList } from "./template-list";
import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";

export default async function TemplatesPage({
  params,
}: {
  params: Promise<{ packageId: string }>;
}) {
  const { packageId } = await params;

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="flex items-center mb-8">
        <Button variant="ghost" size="sm" asChild className="mr-4">
          <Link href="/">
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Packages
          </Link>
        </Button>
        <h1 className="text-3xl font-bold">{packageId} Templates</h1>
      </div>

      <TemplateList packageId={packageId} />
    </div>
  );
}
