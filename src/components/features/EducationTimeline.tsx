"use client";

import { useState, useRef, type ReactNode } from "react";
import Image from "next/image";
import anime from "animejs";
import {
  motion,
  useAnimationControls,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ExternalLink, GraduationCap } from "lucide-react";
import type { EducationMilestone } from "@/src/components/portfolio/types";

function RepeatingTextReveal({
  children,
  delay,
  reduceMotion,
  className,
}: {
  children: ReactNode;
  delay: number;
  reduceMotion: boolean | null;
  className?: string;
}) {
  const controls = useAnimationControls();
  const hiddenY = reduceMotion ? 0 : 12;

  return (
    <motion.div
      className={className}
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
            duration: 0.42,
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

export function EducationTimeline({
  milestones,
}: {
  milestones: readonly EducationMilestone[];
}) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  const setMilestonePreview = (milestoneKey: string, isHovered: boolean) => {
    setHoveredMilestone((current) => {
      if (isHovered) return milestoneKey;
      return current === milestoneKey ? null : current;
    });
  };

  const runEducationHoverIn = (card: HTMLElement) => {
    if (reduceMotion) return;

    const logo = card.querySelector<HTMLElement>("[data-education-logo]");
    const preview = card.querySelector<HTMLElement>("[data-education-preview]");

    if (logo) {
      anime.remove(logo);
      anime({
        targets: logo,
        translateY: [0, -4],
        rotate: [0, -2],
        scale: [1, 1.04],
        duration: 450,
        easing: "easeOutQuad",
      });
    }

    if (preview) {
      anime.remove(preview);
      anime({
        targets: preview,
        opacity: [0.82, 1],
        translateY: [8, 0],
        scale: [0.98, 1],
        duration: 340,
        easing: "easeOutQuad",
      });
    }
  };

  const runEducationHoverOut = (card: HTMLElement) => {
    if (reduceMotion) return;

    const logo = card.querySelector<HTMLElement>("[data-education-logo]");
    if (!logo) return;

    anime.remove(logo);
    anime({
      targets: logo,
      translateY: 0,
      rotate: 0,
      scale: 1,
      duration: 380,
      easing: "easeOutQuad",
    });
  };

  return (
    <motion.div
      ref={timelineRef}
      className="relative mt-4 w-full overflow-visible rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card/95 to-card/75 p-4 shadow-sm md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -right-10 -top-14 h-36 w-36 rounded-full bg-primary/8 blur-2xl md:-right-20 md:-top-24 md:h-56 md:w-56 md:bg-primary/12 md:blur-3xl"
        animate={
          reduceMotion || !timelineInView
            ? { opacity: 0.32, scale: 1 }
            : { opacity: [0.35, 0.8, 0.35], scale: [0.98, 1.06, 0.98] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.5, ease: "easeInOut", repeat: Infinity }
        }
      />

      <div className="relative space-y-4">
        <div className="relative pl-10">
          <div className="absolute bottom-2 left-4 top-2 w-px bg-border/80" />
          <motion.div
            className="absolute bottom-2 left-4 top-2 w-px origin-top bg-primary/70"
            initial={{ scaleY: 0 }}
            animate={timelineInView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-4">
            {milestones.map((milestone, index) => {
              const milestoneKey = `${milestone.period}-${milestone.institution}`;

              return (
                <motion.a
                  key={milestoneKey}
                  href={milestone.website}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Visit ${milestone.institution} website`}
                  onMouseEnter={(event) => {
                    setMilestonePreview(milestoneKey, true);
                    runEducationHoverIn(event.currentTarget);
                  }}
                  onMouseLeave={(event) => {
                    setMilestonePreview(milestoneKey, false);
                    runEducationHoverOut(event.currentTarget);
                  }}
                  onFocus={(event) => {
                    setMilestonePreview(milestoneKey, true);
                    runEducationHoverIn(event.currentTarget);
                  }}
                  onBlur={(event) => {
                    setMilestonePreview(milestoneKey, false);
                    runEducationHoverOut(event.currentTarget);
                  }}
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: index % 2 === 0 ? -22 : 22,
                          y: 18,
                          filter: "blur(5px)",
                        }
                  }
                  animate={
                    timelineInView
                      ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                      : reduceMotion
                        ? { opacity: 0 }
                        : {
                            opacity: 0,
                            x: index % 2 === 0 ? -22 : 22,
                            y: 18,
                            filter: "blur(5px)",
                          }
                  }
                  transition={{
                    duration: 0.58,
                    ease: [0.2, 0.8, 0.2, 1],
                    delay: index * 0.12,
                  }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : {
                          y: -6,
                          scale: 1.02,
                          transition: { type: "spring", stiffness: 220, damping: 18 },
                        }
                  }
                  className="group relative block min-w-0 rounded-2xl border border-border/75 bg-background/90 p-4 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.5)] backdrop-blur-md transition-[border-color,box-shadow] hover:border-primary/45 hover:shadow-[0_26px_56px_-30px_rgba(0,0,0,0.65)] md:p-5"
                >
                  <motion.span
                    className="absolute -left-[29px] top-7 h-3 w-3 rounded-full border-2 border-background bg-primary"
                    animate={
                      reduceMotion || !timelineInView
                        ? { scale: 1 }
                        : { scale: [1, 1.2, 1] }
                    }
                    transition={{
                      duration: 1.8,
                      delay: 0.25 + index * 0.15,
                      repeat: reduceMotion ? 0 : Infinity,
                      ease: "easeInOut",
                    }}
                  />

                  <RepeatingTextReveal
                    className="flex flex-wrap items-start gap-4"
                    delay={0.1 + index * 0.06}
                    reduceMotion={reduceMotion}
                  >
                    {milestone.logo ? (
                      <div
                        data-education-logo
                        className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white p-1.5 shadow-sm"
                      >
                        <Image
                          src={milestone.logo}
                          alt={`${milestone.institution} logo`}
                          width={56}
                          height={56}
                          className="h-full w-full object-contain"
                        />
                      </div>
                    ) : null}

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium uppercase tracking-[0.12em] text-muted-foreground">
                        <span>{milestone.period}</span>
                        <span className="h-1 w-1 rounded-full bg-muted-foreground/70" />
                        <span>{milestone.status}</span>
                      </div>
                      <div className="relative mt-2 inline-flex items-center gap-2">
                        <h3 className="break-words text-lg font-semibold tracking-tight md:text-xl">
                          {milestone.institution}
                        </h3>
                        <ExternalLink className="h-4 w-4 text-primary/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                        <motion.div
                          data-education-preview
                          className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden min-w-[200px] rounded-xl border border-primary/20 bg-background/95 p-2.5 shadow-lg md:block"
                          initial={false}
                          animate={
                            hoveredMilestone === milestoneKey
                              ? { opacity: 1, y: 0, scale: 1 }
                              : { opacity: 0, y: 10, scale: 0.96 }
                          }
                          transition={{ duration: 0.2, ease: [0.2, 0.8, 0.2, 1] }}
                        >
                          <div className="flex items-center gap-2">
                            {milestone.logo ? (
                              <div className="h-8 w-8 overflow-hidden rounded-md border border-border/75 bg-white p-0.5">
                                <Image
                                  src={milestone.logo}
                                  alt={`${milestone.institution} logo`}
                                  width={32}
                                  height={32}
                                  className="h-full w-full object-contain"
                                />
                              </div>
                            ) : null}
                            <div className="min-w-0">
                              <p className="truncate text-xs font-semibold text-foreground">
                                {milestone.institution}
                              </p>
                              <p className="truncate text-xs text-muted-foreground">
                                {milestone.location}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      </div>
                      <p className="break-words text-sm text-muted-foreground">
                        {milestone.program} · {milestone.location}
                      </p>
                      <p className="mt-3 break-words text-sm text-muted-foreground md:text-base">
                        {milestone.summary}
                      </p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {milestone.focus.map((focusItem) => (
                          <span
                            key={`${milestone.institution}-${focusItem}`}
                            className="max-w-full break-all rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-foreground/85"
                          >
                            {focusItem}
                          </span>
                        ))}
                      </div>
                    </div>
                  </RepeatingTextReveal>
                </motion.a>
              );
            })}
          </div>
        </div>

        <motion.div
          className="flex items-center gap-2 text-sm text-muted-foreground"
          initial={{ opacity: 0 }}
          animate={timelineInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ delay: 0.35, duration: 0.45 }}
        >
          <GraduationCap className="h-4 w-4 text-primary" />
          Continuous learning through academics and hands-on product development.
        </motion.div>
      </div>
    </motion.div>
  );
}
