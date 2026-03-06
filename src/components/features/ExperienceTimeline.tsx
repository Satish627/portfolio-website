"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import type { ExperienceItem } from "@/src/components/portfolio/types";

export function ExperienceTimeline({
  items,
}: {
  items: readonly ExperienceItem[];
}) {
  const experienceRef = useRef<HTMLDivElement | null>(null);
  const experienceInView = useInView(experienceRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={experienceRef}
      className="relative mt-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -left-8 -top-6 h-36 w-36 rounded-full bg-sky-300/20 blur-3xl dark:bg-sky-500/20"
        animate={
          reduceMotion || !experienceInView
            ? { opacity: 0.55, scale: 1 }
            : { opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.08, 0.95] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-gradient-to-b from-background/80 via-card/90 to-card/75 p-5 shadow-[0_22px_55px_-42px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Work Experience
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Professional roles and internship delivery
            </h3>
          </div>
          <span className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/80">
            {items.length} Roles
          </span>
        </div>

        <div className="relative pl-7">
          <div className="absolute bottom-1 left-2 top-1 w-px bg-border/80" />
          <motion.div
            className="absolute bottom-1 left-2 top-1 w-px origin-top bg-primary/75"
            initial={{ scaleY: 0 }}
            animate={experienceInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-4">
            {items.map((item, index) => (
              <motion.article
                key={`${item.role}-${item.company}`}
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : { opacity: 0, x: 24, y: 16, filter: "blur(8px)" }
                }
                animate={
                  experienceInView
                    ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                    : reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: 24, y: 16, filter: "blur(8px)" }
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
                        y: -2,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 220, damping: 20 },
                      }
                }
                className="relative rounded-2xl border border-border/70 bg-background/80 p-4 backdrop-blur transition-colors hover:border-primary/45 md:p-5"
              >
                <span className="absolute -left-8 top-7 h-3 w-3 rounded-full border-2 border-background bg-primary" />

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="rounded-full border border-border/70 bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/85">
                    {item.type}
                  </p>
                  <p className="text-xs font-medium uppercase tracking-[0.11em] text-muted-foreground">
                    {item.period}
                  </p>
                </div>

                <h4 className="mt-2 text-lg font-semibold tracking-tight">{item.role}</h4>
                <p className="text-sm text-muted-foreground">
                  {item.company} · {item.location}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">{item.summary}</p>

                <ul className="mt-3 grid gap-1.5">
                  {item.highlights.map((highlight) => (
                    <li
                      key={`${item.company}-${highlight}`}
                      className="text-sm text-foreground/90"
                    >
                      • {highlight}
                    </li>
                  ))}
                </ul>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
