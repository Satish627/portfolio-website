"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Monitor, Server, Wrench } from "lucide-react";
import type { SkillCategory } from "@/src/components/portfolio/types";

const CATEGORY_CONFIG: Record<
  string,
  { barClass: string; glowClass: string; textClass: string; Icon: typeof Monitor }
> = {
  Frontend: {
    Icon: Monitor,
    barClass: "bg-sky-400 dark:bg-sky-500",
    glowClass: "bg-sky-400/15 dark:bg-sky-500/15",
    textClass: "text-sky-400",
  },
  Backend: {
    Icon: Server,
    barClass: "bg-emerald-400 dark:bg-emerald-500",
    glowClass: "bg-emerald-400/15 dark:bg-emerald-500/15",
    textClass: "text-emerald-400",
  },
  "Tools & DevOps": {
    Icon: Wrench,
    barClass: "bg-amber-400 dark:bg-amber-500",
    glowClass: "bg-amber-400/15 dark:bg-amber-500/15",
    textClass: "text-amber-400",
  },
};

const FALLBACK_CONFIG = {
  Icon: Monitor,
  barClass: "bg-primary",
  glowClass: "bg-primary/15",
  textClass: "text-primary",
};

export function SkillsShowcase({
  categories,
}: {
  categories: readonly SkillCategory[];
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduceMotion = useReducedMotion();

  return (
    <div ref={ref} className="mt-6 grid gap-4 md:grid-cols-3">
      {categories.map((category, catIdx) => {
        const cfg = CATEGORY_CONFIG[category.name] ?? FALLBACK_CONFIG;
        const { Icon } = cfg;

        return (
          <motion.div
            key={category.name}
            initial={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.97 }}
            animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
            transition={{
              duration: 0.5,
              delay: catIdx * 0.12,
              ease: [0.2, 0.8, 0.2, 1],
            }}
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-background/95 p-5 backdrop-blur shadow-sm transition-[border-color,box-shadow] hover:border-primary/40 hover:shadow-[0_18px_40px_-26px_rgba(0,0,0,0.5)]"
          >
            {/* Ambient glow */}
            <div
              className={`pointer-events-none absolute -right-6 -top-6 h-28 w-28 rounded-full blur-2xl ${cfg.glowClass}`}
            />

            <div className="relative flex flex-col gap-4">
              {/* Category header */}
              <div className={`flex items-center gap-2 ${cfg.textClass}`}>
                <Icon className="h-4 w-4" />
                <span className="text-xs font-semibold uppercase tracking-[0.16em]">
                  {category.name}
                </span>
              </div>

              {/* Skills */}
              <div className="flex flex-col gap-4">
                {category.skills.map((skill, skillIdx) => (
                  <div key={skill.name}>
                    <div className="mb-1.5 flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground/90">
                        {skill.name}
                      </span>
                      <motion.span
                        className={`text-xs font-semibold tabular-nums ${cfg.textClass}`}
                        initial={{ opacity: 0 }}
                        animate={inView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: reduceMotion
                            ? 0
                            : catIdx * 0.12 + skillIdx * 0.08 + 0.4,
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border/30">
                      <motion.div
                        className={`h-full rounded-full ${cfg.barClass}`}
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : { width: 0 }}
                        transition={{
                          duration: reduceMotion ? 0 : 0.75,
                          delay: reduceMotion
                            ? 0
                            : catIdx * 0.12 + skillIdx * 0.08,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
