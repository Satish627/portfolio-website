import Link from "next/link";
import { Button } from "@/src/components/ui/button";

export default function AboutPage() {
  return (
    <main className="mx-auto flex min-h-[calc(100svh-4rem)] w-full max-w-5xl flex-col justify-center gap-10 px-4 py-16">
      <section className="space-y-4">
        <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
          About Me
        </h1>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          I am a student developer based in Denmark with a strong interest in
          building modern web applications and interactive digital systems. I
          enjoy working at the intersection of design, engineering, and
          research, where technology can be used to create meaningful user
          experiences.
        </p>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          My journey into development started with curiosity about how digital
          products work behind the scenes. Over time, that curiosity turned
          into a passion for building things myself - from small web
          applications to more complex systems involving real-time data, UI
          experimentation, and performance-focused architecture.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Strengths
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          My main focus is frontend development, particularly building
          responsive and interactive interfaces using modern tools such as
          Next.js, TypeScript, Tailwind CSS, and component-based architectures.
          I enjoy designing systems that are modular, maintainable, and
          scalable.
        </p>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          At the same time, I am comfortable working across the stack and
          understanding how frontend systems integrate with backend services,
          APIs, and real-time data flows.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Working Style
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          I enjoy working in environments where ideas can quickly turn into
          working prototypes. I value clear architecture, clean code, and
          thoughtful user experience. I like to take ownership of the systems I
          build and focus on delivering solutions that are both technically
          sound and enjoyable to use.
        </p>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          Collaboration and feedback are also important to me, as they help
          refine both the product and the engineering approach.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold tracking-tight md:text-2xl">
          Current Goals
        </h2>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          Right now, I am focused on expanding my experience as a developer by
          working on challenging projects that involve modern web technologies,
          system design, and interactive user interfaces.
        </p>
        <p className="max-w-3xl text-base text-muted-foreground md:text-lg">
          I am particularly interested in opportunities where I can continue
          learning while contributing to building thoughtful, well-engineered
          digital products.
        </p>
      </section>

      <div className="pt-2">
        <Button asChild variant="outline">
          <Link href="/#about">Back to Home Section</Link>
        </Button>
      </div>
    </main>
  );
}
