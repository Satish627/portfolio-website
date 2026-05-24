"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";
import {
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowUpRight,
  Code2,
  FolderKanban,
  Github,
  Rocket,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { ProjectItem } from "@/src/components/portfolio/types";


const GITHUB_URL = "https://github.com/Satish627";

export function ProjectsShowcase({
  projects,
}: {
  projects: readonly ProjectItem[];
}) {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const projectsBadgeRef = useRef<HTMLSpanElement | null>(null);
  const projectsInView = useInView(projectsRef, { once: true, amount: 0.05 });
  const reduceMotion = useReducedMotion();
  const projectIcons = [Rocket, Code2, FolderKanban] as const;
  const visibleProjects = projects.slice(0, 6);

  useEffect(() => {
    if (reduceMotion || !projectsBadgeRef.current) return;

    const animation = anime({
      targets: projectsBadgeRef.current,
      scale: [1, 1.06],
      duration: 1700,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });

    return () => animation.pause();
  }, [reduceMotion]);

  return (
    <motion.div
      ref={projectsRef}
      className="relative mt-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -left-6 -top-6 h-28 w-28 rounded-full bg-amber-300/15 blur-2xl md:-left-10 md:-top-8 md:h-40 md:w-40 md:bg-amber-300/20 md:blur-3xl dark:bg-amber-500/15 md:dark:bg-amber-500/20"
        animate={
          reduceMotion || !projectsInView
            ? { opacity: 0.45, scale: 1 }
            : { opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.08, 0.95] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="pointer-events-none absolute -bottom-6 right-0 h-28 w-28 rounded-full bg-cyan-300/15 blur-2xl md:-bottom-10 md:h-44 md:w-44 md:bg-cyan-300/20 md:blur-3xl dark:bg-cyan-500/15 md:dark:bg-cyan-500/20"
        animate={
          reduceMotion || !projectsInView
            ? { opacity: 0.42, scale: 1 }
            : { opacity: [0.28, 0.62, 0.28], scale: [1, 1.1, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }
        }
      />

      <div className="relative rounded-3xl border border-border/70 bg-linear-to-b from-background/95 via-card/98 to-card/90 p-5 shadow-[0_22px_55px_-42px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <FolderKanban className="h-3.5 w-3.5" />
              Featured Work
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Selected projects from study and real-world building
            </h3>
          </motion.div>
          <motion.span
            ref={projectsBadgeRef}
            className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/80"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={projectsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.38, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {visibleProjects.length} Projects
          </motion.span>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {visibleProjects.map((project, index) => {
            const Icon = projectIcons[index % projectIcons.length];
            return (
              <motion.article
                key={`${project.category}-${project.title}`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, y: 28, scale: 0.96, filter: "blur(6px)" }
                }
                whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ amount: 0.45, once: false, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: 0.62,
                  delay: index * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                className="group relative min-h-[180px] min-w-0 overflow-hidden rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_24px_48px_-28px_rgba(0,0,0,0.7)] md:p-5"
              >
                {/* Always-visible face */}
                <div className="flex h-full flex-col gap-3">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                      {project.category}
                    </p>
                    <Icon className="h-4 w-4 text-primary/85" />
                  </div>
                  <h4 className="break-words text-lg font-semibold tracking-tight">
                    {project.title}
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {project.stack.map((tech) => (
                      <span
                        key={`${project.title}-${tech}`}
                        className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground/85"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Hover overlay — slides up from bottom */}
                <div className="absolute inset-0 flex translate-y-full flex-col gap-3 rounded-2xl bg-card/98 p-4 backdrop-blur-sm transition-transform duration-300 ease-out group-hover:translate-y-0 md:p-5">
                  <p className="text-sm text-muted-foreground">{project.summary}</p>
                  <p className="rounded-xl border border-border/70 bg-background/60 px-3 py-2 text-sm text-foreground/90">
                    {project.highlight}
                  </p>
                  {project.links?.length ? (
                    <div className="mt-auto flex flex-wrap gap-2">
                      {project.links.map((link) => {
                        const isExternal = link.href.startsWith("http");
                        return (
                          <a
                            key={`${project.title}-${link.href}`}
                            href={link.href}
                            target={isExternal ? "_blank" : undefined}
                            rel={isExternal ? "noreferrer" : undefined}
                            className="inline-flex max-w-full items-center gap-1.5 break-all rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/45 hover:text-primary"
                          >
                            {link.label}
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        );
                      })}
                    </div>
                  ) : null}
                </div>
              </motion.article>
            );
          })}
        </div>

        <div className="mt-5 flex justify-center">
          <Button asChild variant="outline" className="gap-2">
            <a href={GITHUB_URL} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" />
              See all projects on GitHub
              <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
          </Button>
        </div>
      </div>
    </motion.div>
  );
}
