"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ScrollStatus } from "@/src/components/scroll-status";
import { Button } from "@/src/components/ui/button";
import { cn } from "@/src/lib/utils";

const sections = [
  {
    id: "about",
    title: "About",
    description:
      "Who I am, what I build, and how I approach product and engineering work.",
  },
  {
    id: "projects",
    title: "Projects",
    description:
      "Selected work with clean UI, practical architecture, and measurable outcomes.",
  },
  {
    id: "education",
    title: "Education",
    description:
      "My academic path, key coursework, and learning milestones that shaped my skills.",
  },
  {
    id: "contact",
    title: "Contact",
    description:
      "Ways to connect for freelance opportunities, internships, or collaborations.",
  },
];

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const [heroVisible, setHeroVisible] = useState(false);

  useEffect(() => {
    const target = heroRef.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeroVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <main id="home" className="bg-background">
      <ScrollStatus
        sections={[
          { id: "home", label: "Home" },
          ...sections.map((section) => ({
            id: section.id,
            label: section.title,
          })),
        ]}
      />

      <section
        ref={heroRef}
        className={cn(
          "border-b transition-all duration-700 motion-reduce:transition-none",
          heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
        )}
      >
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
          </div>
        </div>
      </section>

      {sections.map((section) => (
        <RevealSection key={section.id} section={section} />
      ))}
    </main>
  );
}

function RevealSection({
  section,
}: {
  section: { id: string; title: string; description: string };
}) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const target = ref.current;
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      id={section.id}
      className={cn(
        "section-anchor scroll-mt-24 border-b last:border-b-0",
        "transition-all duration-700 motion-reduce:transition-none",
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      )}
    >
      <div className="section-content mx-auto flex min-h-[80svh] w-full max-w-5xl flex-col justify-center gap-4 px-4 py-16">
        <p className="text-sm uppercase tracking-[0.16em] text-muted-foreground">
          Section
        </p>
        <h2 className="text-3xl font-semibold tracking-tight md:text-5xl">
          {section.title}
        </h2>
        <p className="max-w-2xl text-base text-muted-foreground md:text-lg">
          {section.description}
        </p>
      </div>
    </section>
  );
}
