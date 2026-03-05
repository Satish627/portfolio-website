import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function ProjectsPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Projects
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        Add detailed case studies here: problem, constraints, architecture,
        stack, and results.
      </p>
      <div>
        <Button asChild variant="outline">
          <Link href="/#projects">Back To Home Section</Link>
        </Button>
      </div>
    </main>
  );
}
