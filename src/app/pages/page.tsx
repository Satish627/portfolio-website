import Link from "next/link";
import { Button } from "@/src/components/ui/button";

const sections = [
  {
    id: "about",
    title: "About",
    description:
      "Who I am, what I build, and how I approach product and engineering work.",
    pageHref: "/about",
  },
  {
    id: "projects",
    title: "Projects",
    description:
      "Selected work with clean UI, practical architecture, and measurable outcomes.",
    pageHref: "/projects",
  },
  {
    id: "education",
    title: "Education",
    description:
      "My academic path, key coursework, and learning milestones that shaped my skills.",
    pageHref: "/education",
  },
  {
    id: "contact",
    title: "Contact",
    description:
      "Ways to connect for freelance opportunities, internships, or collaborations.",
    pageHref: "/contact",
  },
];

export default function Home() {
  return (
    <main id="home" className="bg-background">
      <section className="border-b">
        <div className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col justify-center gap-6 px-4 py-20">
          <p className="text-sm uppercase tracking-[0.2em] text-muted-foreground">
            Portfolio
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight md:text-6xl">
            Scrollable home page with all core sections in one place.
          </h1>
          <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
            You can scroll this page to view About, Projects, Education, and
            Contact. Each section also has its own dedicated page.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/#projects">View Projects Section</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/projects">Open Projects Page</Link>
            </Button>
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className="scroll-mt-24 border-b last:border-b-0"
        >
          <div className="mx-auto flex min-h-[80svh] w-full max-w-5xl flex-col justify-center gap-4 px-4 py-16">
            <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
              Section
            </p>
            <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
              {section.title}
            </h2>
            <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
              {section.description}
            </p>
            <div>
              <Button asChild variant="secondary">
                <Link href={section.pageHref}>Open {section.title} Page</Link>
              </Button>
            </div>
          </div>
        </section>
      ))}
    </main>
  );
}
