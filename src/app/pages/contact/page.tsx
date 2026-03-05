import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function ContactPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col justify-center gap-4 px-4 py-16">
      <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
        Contact
      </h1>
      <p className="max-w-2xl text-muted-foreground">
        Add your email, social links, and a contact form so people can reach
        out quickly.
      </p>
      <div>
        <Button asChild variant="outline">
          <Link href="/#contact">Back To Home Section</Link>
        </Button>
      </div>
    </main>
  );
}
