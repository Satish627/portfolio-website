"use client";

import { useState, type MouseEvent } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { itemVariants } from "@/src/components/portfolio/motion";

export function HeroImageCard({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [spinTurns, setSpinTurns] = useState(0);

  const rotateX = useSpring(useTransform(pointerY, [-130, 130], [18, -18]), {
    stiffness: 220,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(pointerX, [-130, 130], [-20, 20]), {
    stiffness: 220,
    damping: 18,
  });
  const glareX = useTransform(pointerX, [-130, 130], [20, 80]);
  const glareY = useTransform(pointerY, [-130, 130], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5), rgba(255,255,255,0) 52%)`;

  const handleMouseMove = (event: MouseEvent<HTMLDivElement>) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    pointerX.set(x);
    pointerY.set(y);
  };

  const handleMouseLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const handleSpinClick = () => {
    if (reduceMotion) return;
    setSpinTurns((current) => current + 1);
  };

  return (
    <motion.div
      className="relative order-2 mx-auto w-full max-w-[250px] md:order-2 md:max-w-[300px]"
      variants={itemVariants}
      style={{ perspective: 1300 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        className="pointer-events-none absolute -inset-5 -z-10 rounded-[2rem] bg-gradient-to-br from-cyan-300/25 via-sky-200/10 to-emerald-300/20 blur-2xl dark:from-cyan-500/25 dark:via-blue-500/15 dark:to-emerald-400/15"
        animate={
          reduceMotion || !inView
            ? { opacity: 0.65, scale: 1 }
            : { opacity: [0.45, 0.88, 0.45], scale: [0.96, 1.08, 0.96] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5.4, ease: "easeInOut", repeat: Infinity }
        }
      />

      <motion.div
        style={{
          rotateX: reduceMotion ? 0 : rotateX,
          rotateY: reduceMotion ? 0 : rotateY,
          transformStyle: "preserve-3d",
          willChange: "transform",
        }}
        animate={
          reduceMotion || !inView
            ? { y: 0, rotateZ: 0 }
            : { y: [0, -14, 0], rotateZ: [0, 1.2, 0] }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 3.8,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "mirror",
              }
        }
        whileHover={
          reduceMotion
            ? undefined
            : {
                scale: 1.08,
                rotateZ: -0.8,
                transition: { type: "spring", stiffness: 220, damping: 18 },
              }
        }
      >
        <motion.div
          className="cursor-pointer"
          onClick={handleSpinClick}
          animate={reduceMotion ? { rotateZ: 0 } : { rotateZ: spinTurns * 360 }}
          transition={
            reduceMotion
              ? undefined
              : {
                  duration: 0.85,
                  ease: [0.2, 0.85, 0.2, 1],
                }
          }
        >
          <motion.div
            animate={
              reduceMotion || !inView
                ? { opacity: 1, scale: 1 }
                : { opacity: [0.96, 1, 0.98, 1], scale: [0.99, 1, 1.01, 1] }
            }
            transition={
              reduceMotion
                ? undefined
                : {
                    duration: 3.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }
            }
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl"
            style={{ transform: "translateZ(46px)" }}
          >
            <motion.div
              className="pointer-events-none absolute inset-0 bg-gradient-to-b from-zinc-100 via-white to-zinc-200 dark:from-slate-900 dark:via-zinc-950 dark:to-slate-900"
              animate={reduceMotion ? { opacity: 1 } : { opacity: [0.96, 1, 0.96] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 4.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
            <motion.div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(56,189,248,0.22),rgba(255,255,255,0)_48%)] dark:bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.24),rgba(0,0,0,0)_44%),radial-gradient(circle_at_80%_88%,rgba(59,130,246,0.2),rgba(0,0,0,0)_54%)]"
              animate={reduceMotion ? { opacity: 0.6 } : { opacity: [0.45, 0.78, 0.45] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
            <Image
              src="/hero.png"
              alt="Portrait of Satish"
              width={900}
              height={1200}
              priority
              className="relative z-10 h-auto w-full object-cover saturate-[1.02] dark:brightness-110 dark:contrast-110 dark:saturate-110"
              sizes="(min-width: 768px) 300px, 250px"
            />
            <motion.div
              className="pointer-events-none absolute inset-0 z-20 hidden bg-gradient-to-t from-black/28 via-transparent to-cyan-300/8 dark:block"
              animate={reduceMotion ? { opacity: 0.55 } : { opacity: [0.38, 0.62, 0.38] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 3.6,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
            <motion.div
              className="pointer-events-none absolute inset-0 z-30 mix-blend-screen"
              style={{ background: glare }}
              animate={reduceMotion ? { opacity: 0 } : { opacity: [0.2, 0.5, 0.2] }}
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2.2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
