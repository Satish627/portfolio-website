"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { StoryStep } from "@/src/components/portfolio/types";

export function HorizontalStoryStepper({
  steps,
}: {
  steps: readonly StoryStep[];
}) {
  const stepperRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(stepperRef, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (!inView || reduceMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let frame = 0;
    let direction = 1;
    let previous = performance.now();
    const speed = 28;

    const tick = (now: number) => {
      const maxScroll = track.scrollWidth - track.clientWidth;
      const deltaSeconds = (now - previous) / 1000;
      previous = now;

      if (maxScroll > 0) {
        let next = track.scrollLeft + direction * speed * deltaSeconds;

        if (next >= maxScroll) {
          next = maxScroll;
          direction = -1;
        } else if (next <= 0) {
          next = 0;
          direction = 1;
        }

        track.scrollLeft = next;
      }

      frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reduceMotion, steps.length]);

  return (
    <motion.div
      ref={stepperRef}
      className="w-full pt-3"
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: 0.45, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div ref={trackRef} className="flex gap-4 overflow-x-auto pb-2">
        {steps.map((step, index) => (
          <motion.article
            key={`${step.phase}-${step.title}`}
            initial={{ opacity: 0, x: 24, scale: 0.98 }}
            animate={
              inView
                ? { opacity: 1, x: 0, scale: 1 }
                : { opacity: 0, x: 24, scale: 0.98 }
            }
            transition={{
              duration: 0.45,
              delay: index * 0.08,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="relative min-w-[250px] max-w-[280px] flex-1 rounded-xl border bg-card/80 p-4 shadow-sm"
          >
            <p className="text-xs font-semibold tracking-[0.16em] text-primary">
              {step.phase}
            </p>
            <h3 className="mt-1 text-lg font-semibold tracking-tight">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{step.description}</p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}
