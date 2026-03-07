"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { BriefcaseBusiness } from "lucide-react";
import type { ExperienceItem } from "@/src/components/portfolio/types";

function RepeatingTextReveal({
  children,
  delay,
  reduceMotion,
}: {
  children: ReactNode;
  delay: number;
  reduceMotion: boolean | null;
}) {
  const controls = useAnimationControls();
  const hiddenY = reduceMotion ? 0 : 12;

  return (
    <motion.div
      initial={{ opacity: 0, y: hiddenY }}
      animate={controls}
      viewport={{ amount: 0.08, once: false, margin: "0px 0px -6% 0px" }}
      onViewportEnter={() => {
        if (reduceMotion) {
          controls.set({ opacity: 1, y: 0 });
          return;
        }
        controls.set({ opacity: 0, y: hiddenY });
        void controls.start({
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.4,
            delay,
            ease: [0.2, 0.8, 0.2, 1],
          },
        });
      }}
    >
      {children}
    </motion.div>
  );
}

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
        className="pointer-events-none absolute -left-6 -top-5 h-24 w-24 rounded-full bg-sky-300/15 blur-2xl md:-left-8 md:-top-6 md:h-36 md:w-36 md:bg-sky-300/20 md:blur-3xl dark:bg-sky-500/15 md:dark:bg-sky-500/20"
        animate={
          reduceMotion || !experienceInView
            ? { opacity: 0.45, scale: 1 }
            : { opacity: [0.3, 0.7, 0.3], scale: [0.95, 1.08, 0.95] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.2, repeat: Infinity, ease: "easeInOut" }
        }
      />

      <div className="relative overflow-hidden rounded-3xl border border-border/70 bg-linear-to-b from-background/95 via-card/98 to-card/90 p-5 shadow-[0_22px_55px_-42px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3">
          <motion.div
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
          >
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-primary">
              <BriefcaseBusiness className="h-3.5 w-3.5" />
              Work Experience
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Professional roles and internship delivery
            </h3>
          </motion.div>
          <motion.span
            className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/80"
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 8 }}
            animate={experienceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
            transition={{ duration: 0.38, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
          >
            {items.length} Roles
          </motion.span>
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
                    : { opacity: 0, x: 30, y: 28, scale: 0.96, filter: "blur(6px)" }
                }
                whileInView={{ opacity: 1, x: 0, y: 0, scale: 1, filter: "blur(0px)" }}
                viewport={{ amount: 0.45, once: false, margin: "0px 0px -12% 0px" }}
                transition={{
                  duration: 0.62,
                  delay: index * 0.08,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -5,
                        scale: 1.02,
                        transition: { type: "spring", stiffness: 230, damping: 18 },
                      }
                }
                className="relative min-w-0 rounded-2xl border border-border/70 bg-background/95 p-4 backdrop-blur transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_24px_46px_-30px_rgba(0,0,0,0.68)] md:p-5"
              >
                <span className="absolute -left-8 top-7 h-3 w-3 rounded-full border-2 border-background bg-primary" />
                <RepeatingTextReveal delay={0.08 + index * 0.05} reduceMotion={reduceMotion}>
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="rounded-full border border-border/70 bg-card px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-foreground/85">
                      {item.type}
                    </p>
                    <p className="text-xs font-medium uppercase tracking-[0.11em] text-muted-foreground">
                      {item.period}
                    </p>
                  </div>

                  <h4 className="mt-2 break-words text-lg font-semibold tracking-tight">{item.role}</h4>
                  <p className="break-words text-sm text-muted-foreground">
                    {item.company} · {item.location}
                  </p>
                  <p className="mt-2 break-words text-sm text-muted-foreground">{item.summary}</p>

                  <ul className="mt-3 grid gap-1.5">
                    {item.highlights.map((highlight) => (
                      <li
                        key={`${item.company}-${highlight}`}
                        className="break-words text-sm text-foreground/90"
                      >
                        • {highlight}
                      </li>
                    ))}
                  </ul>
                </RepeatingTextReveal>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
