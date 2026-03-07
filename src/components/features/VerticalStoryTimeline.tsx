"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card";
import { Separator } from "@/src/components/ui/separator";
import type { StoryStep } from "@/src/components/portfolio/types";
import { cn } from "@/src/lib/utils";

function StoryStepCard({
  step,
  align = "left",
}: {
  step: StoryStep;
  align?: "left" | "right";
}) {
  return (
    <Card
      className={cn(
        "gap-3 border-border/70 bg-card/85 py-5 shadow-[0_18px_35px_-30px_rgba(0,0,0,0.6)] transition-[box-shadow,border-color] duration-250 hover:border-primary/45 hover:shadow-[0_28px_56px_-32px_rgba(0,0,0,0.7)]",
        align === "left" ? "md:text-right" : "md:text-left"
      )}
    >
      <CardHeader className="gap-1 px-5">
        <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary">{step.phase}</p>
        <CardTitle className="text-lg tracking-tight">{step.title}</CardTitle>
      </CardHeader>
      <CardContent className="px-5 text-sm text-muted-foreground md:text-base">
        {step.description}
      </CardContent>
    </Card>
  );
}

export function VerticalStoryTimeline({
  steps,
}: {
  steps: readonly StoryStep[];
}) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const scrollRootRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(timelineRef, { once: false, amount: 0.2 });
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      ref={timelineRef}
      className="mt-6 w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div
        ref={scrollRootRef}
        className="max-h-[72vh] overflow-x-hidden overflow-y-auto pr-1 [scrollbar-width:thin] [scrollbar-color:hsl(var(--border))_transparent]"
      >
        <div className="relative hidden md:block">
          <Separator
            orientation="vertical"
            className="absolute left-1/2 top-1 h-[calc(100%-0.5rem)] -translate-x-1/2 bg-border/80"
          />
          <motion.div
            className="absolute left-1/2 top-1 h-[calc(100%-0.5rem)] w-px -translate-x-1/2 origin-top bg-primary/70"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-6">
            {steps.map((step, index) => {
              const isLeft = index % 2 === 0;

              return (
                <motion.div
                  key={`${step.phase}-${step.title}`}
                  className="grid grid-cols-[1fr_auto_1fr] items-start gap-6"
                  initial={
                    reduceMotion
                      ? { opacity: 0 }
                      : { opacity: 0, x: isLeft ? -26 : 26, y: 18, filter: "blur(8px)" }
                  }
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
                  viewport={{ root: scrollRootRef, amount: 0.45, once: false }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                    ease: [0.2, 0.8, 0.2, 1],
                  }}
                >
                  <motion.div
                    className={cn(
                      "min-h-[1px] min-w-0 origin-center",
                      isLeft ? "col-start-1" : "col-start-3"
                    )}
                    whileHover={
                      reduceMotion
                        ? undefined
                        : {
                            y: -8,
                            scale: 1.04,
                            transition: { type: "spring", stiffness: 260, damping: 18 },
                          }
                    }
                  >
                    <StoryStepCard step={step} align={isLeft ? "left" : "right"} />
                  </motion.div>

                  <div className="col-start-2 flex justify-center pt-7">
                    <span className="h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        <div className="relative pl-7 md:hidden">
          <Separator
            orientation="vertical"
            className="absolute left-2 top-1 h-[calc(100%-0.5rem)] bg-border/80"
          />
          <motion.div
            className="absolute left-2 top-1 h-[calc(100%-0.5rem)] w-px origin-top bg-primary/70"
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ duration: 1.05, ease: [0.22, 1, 0.36, 1] }}
          />

          <div className="space-y-4">
            {steps.map((step, index) => (
              <motion.div
                key={`${step.phase}-${step.title}-mobile`}
                className="relative origin-left"
                initial={reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20, y: 16 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : {
                        y: -8,
                        scale: 1.04,
                        transition: { type: "spring", stiffness: 260, damping: 18 },
                      }
                }
                viewport={{ root: scrollRootRef, amount: 0.45, once: false }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.04,
                  ease: [0.2, 0.8, 0.2, 1],
                }}
              >
                <span className="absolute -left-[26px] top-7 h-3.5 w-3.5 rounded-full border-2 border-background bg-primary" />
                <StoryStepCard step={step} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
