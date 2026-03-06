"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  ChevronDown,
  ChevronUp,
  Code2,
  FolderKanban,
  Rocket,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { ProjectItem } from "@/src/components/portfolio/types";

export function ProjectsShowcase({
  projects,
}: {
  projects: readonly ProjectItem[];
}) {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const projectsBadgeRef = useRef<HTMLSpanElement | null>(null);
  const projectsInView = useInView(projectsRef, { once: false, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectIcons = [Rocket, Code2, FolderKanban] as const;
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);
  const shouldRevealProjects = projectsInView || showAllProjects;

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

  useEffect(() => {
    if (!showAllProjects || reduceMotion || !projectsRef.current) return;
    const extraCards = projectsRef.current.querySelectorAll(
      "[data-project-level='extra']"
    );
    if (!extraCards.length) return;

    anime.remove(extraCards);
    anime({
      targets: extraCards,
      opacity: [0.2, 1],
      translateY: [24, 0],
      scale: [0.97, 1],
      delay: anime.stagger(80),
      duration: 620,
      easing: "easeOutExpo",
    });
  }, [showAllProjects, reduceMotion]);

  const handleToggleProjects = () => {
    if (showAllProjects) {
      setShowAllProjects(false);

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const sectionTop = projectsRef.current
            ? projectsRef.current.getBoundingClientRect().top + window.scrollY - 104
            : 0;

          window.scrollTo({
            top: Math.max(0, sectionTop),
            behavior: "smooth",
          });
        });
      });

      return;
    }

    window.requestAnimationFrame(() => {
      window.requestAnimationFrame(() => {
        window.scrollBy({
          top: Math.min(280, window.innerHeight * 0.34),
          behavior: "smooth",
        });
      });
    });

    setShowAllProjects((current) => !current);
  };

  return (
    <motion.div
      ref={projectsRef}
      className="relative mt-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={shouldRevealProjects ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -left-10 -top-8 h-40 w-40 rounded-full bg-amber-300/20 blur-3xl dark:bg-amber-500/20"
        animate={
          reduceMotion || !shouldRevealProjects
            ? { opacity: 0.55, scale: 1 }
            : { opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.08, 0.95] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.6, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 right-0 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/20"
        animate={
          reduceMotion || !shouldRevealProjects
            ? { opacity: 0.5, scale: 1 }
            : { opacity: [0.28, 0.62, 0.28], scale: [1, 1.1, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.35 }
        }
      />

      <div className="relative rounded-3xl border border-border/70 bg-gradient-to-b from-background/80 via-card/90 to-card/75 p-5 shadow-[0_22px_55px_-42px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <FolderKanban className="h-3.5 w-3.5" />
              Featured Work
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Selected projects from study and real-world building
            </h3>
          </div>
          <span
            ref={projectsBadgeRef}
            className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/80"
          >
            {projects.length} Projects
          </span>
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
                    : { opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }
                }
                animate={
                  shouldRevealProjects
                    ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, y: 18, scale: 0.98, filter: "blur(8px)" }
                }
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -3,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 220, damping: 20 },
                      }
                }
                className="group rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur transition-colors hover:border-primary/45 md:p-5"
                data-project-level={showAllProjects && index >= 4 ? "extra" : "base"}
              >
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {project.category}
                  </p>
                  <Icon className="h-4 w-4 text-primary/85 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </div>
                <h4 className="mt-2 text-lg font-semibold tracking-tight">
                  {project.title}
                </h4>
                <p className="mt-2 text-sm text-muted-foreground">{project.summary}</p>
                <p className="mt-3 rounded-xl border border-border/70 bg-card/75 px-3 py-2 text-sm text-foreground/90">
                  {project.highlight}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={`${project.title}-${tech}`}
                      className="rounded-full border border-border/70 bg-background px-2.5 py-1 text-xs font-medium text-foreground/85"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                {project.links?.length ? (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {project.links.map((link) => {
                      const isExternal = link.href.startsWith("http");
                      return (
                        <a
                          key={`${project.title}-${link.href}`}
                          href={link.href}
                          target={isExternal ? "_blank" : undefined}
                          rel={isExternal ? "noreferrer" : undefined}
                          className="inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/80 px-2.5 py-1 text-xs font-medium text-foreground transition-colors hover:border-primary/45 hover:text-primary"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3" />
                        </a>
                      );
                    })}
                  </div>
                ) : null}
              </motion.article>
            );
          })}
        </div>
        {projects.length > 4 ? (
          <div className="mt-5 flex justify-center">
            <Button
              type="button"
              variant="outline"
              onClick={handleToggleProjects}
              className="min-w-48"
            >
              {showAllProjects ? "Show fewer projects" : "Show more projects"}
              {showAllProjects ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </Button>
          </div>
        ) : null}
      </div>
    </motion.div>
  );
}
