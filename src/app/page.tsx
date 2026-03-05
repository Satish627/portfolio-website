"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  type Variants,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { aboutSection } from "@/src/app/about/content";
import { contactSection } from "@/src/app/contact/content";
import { educationSection } from "@/src/app/education/content";
import { homeSection } from "@/src/app/home/content";
import { projectsSection } from "@/src/app/projects/content";
import { ScrollStatus } from "@/src/components/scroll-status";
import { Button } from "@/src/components/ui/button";

const sections = [
  aboutSection,
  projectsSection,
  educationSection,
  contactSection,
] as const;

type PortfolioSection = (typeof sections)[number];

const sectionVariants: Variants = {
  hidden: { opacity: 0.15 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left center" },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export default function Home() {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.35 });

  return (
    <main className="bg-transparent">
      <ScrollStatus
        sections={[
          { id: "home" },
          ...sections.map((section) => ({ id: section.id })),
        ]}
      />

      <motion.section
        ref={heroRef}
        id="home"
        className="scroll-mt-16 border-b"
        initial="hidden"
        animate={heroInView ? "visible" : "hidden"}
        variants={sectionVariants}
      >
        <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center gap-6 px-4 py-2 md:grid-cols-[1.15fr_0.85fr] md:py-4">
          <motion.div
            className="order-2 flex flex-col gap-4 md:order-1"
            variants={staggerVariants}
          >
            <motion.p
              className="text-sm uppercase tracking-[0.2em] text-muted-foreground"
              variants={itemVariants}
            >
              {homeSection.badge}
            </motion.p>
            <motion.h1
              className="max-w-3xl text-3xl font-semibold tracking-tight md:text-5xl"
              variants={itemVariants}
            >
              {homeSection.headline}
            </motion.h1>
            {homeSection.paragraphs.map((paragraph, index) => (
              <motion.p
                key={`${homeSection.id}-paragraph-${index}`}
                className="max-w-3xl text-sm text-muted-foreground md:text-base"
                variants={itemVariants}
                transition={{ delay: index * 0.07 + 0.05 }}
              >
                {paragraph}
              </motion.p>
            ))}
            <motion.div className="flex flex-wrap gap-3 pt-1" variants={itemVariants}>
              {homeSection.ctas.map((cta) => (
                <Button
                  key={cta.href}
                  asChild
                  variant={cta.variant === "outline" ? "outline" : "default"}
                >
                  <Link href={cta.href}>{cta.label}</Link>
                </Button>
              ))}
            </motion.div>
          </motion.div>

          <HeroImageCard inView={heroInView} />
        </div>
      </motion.section>

      {sections.map((section) => (
        <RevealSection key={section.id} section={section} />
      ))}
    </main>
  );
}

function RevealSection({
  section,
}: {
  section: PortfolioSection;
}) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, { once: false, amount: 0.35 });

  return (
    <motion.section
      ref={sectionRef}
      id={section.id}
      className="section-anchor scroll-mt-24 border-b last:border-b-0"
      initial="hidden"
      animate={sectionInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <motion.div
        className="section-content mx-auto flex min-h-[80svh] w-full max-w-5xl flex-col justify-center gap-4 px-4 py-16"
        variants={staggerVariants}
      >
        <motion.div
          className="mb-2 h-1 w-24 rounded-full bg-primary/70"
          variants={lineVariants}
        />
        <motion.p
          className="text-sm uppercase tracking-[0.16em] text-muted-foreground"
          variants={itemVariants}
        >
          Section
        </motion.p>
        <motion.h2
          className="text-3xl font-semibold tracking-tight md:text-5xl"
          variants={itemVariants}
        >
          {section.title}
        </motion.h2>
        <motion.p
          className="max-w-2xl text-base text-muted-foreground md:text-lg"
          variants={itemVariants}
        >
          {section.description}
        </motion.p>
        {section.details?.map((paragraph, index) => (
          <motion.p
            key={`${section.id}-${index}`}
            className="max-w-3xl text-base text-muted-foreground md:text-lg"
            variants={itemVariants}
            transition={{ delay: index * 0.08 + 0.05 }}
          >
            {paragraph}
          </motion.p>
        ))}

        {"storySteps" in section && section.storySteps && (
          <HorizontalStoryStepper steps={section.storySteps} />
        )}
      </motion.div>
    </motion.section>
  );
}

function HorizontalStoryStepper({
  steps,
}: {
  steps: readonly { phase: string; title: string; description: string }[];
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
    const speed = 28; // px/sec

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
            <h3 className="mt-1 text-lg font-semibold tracking-tight">
              {step.title}
            </h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {step.description}
            </p>
          </motion.article>
        ))}
      </div>
    </motion.div>
  );
}

function HeroImageCard({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(pointerY, [-130, 130], [18, -18]),
    { stiffness: 220, damping: 18 }
  );
  const rotateY = useSpring(
    useTransform(pointerX, [-130, 130], [-20, 20]),
    { stiffness: 220, damping: 18 }
  );
  const glareX = useTransform(pointerX, [-130, 130], [20, 80]);
  const glareY = useTransform(pointerY, [-130, 130], [18, 82]);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.5), rgba(255,255,255,0) 52%)`;

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
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

  return (
    <motion.div
      className="order-1 mx-auto w-full max-w-[250px] md:order-2 md:max-w-[300px]"
      variants={itemVariants}
      style={{ perspective: 1300 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
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
                  ease: "easeInOut",
                  repeat: Infinity,
                }
          }
          className="relative overflow-hidden rounded-2xl border border-border/70 bg-card shadow-xl"
          style={{ transform: "translateZ(46px)" }}
        >
          <Image
            src="/hero.png"
            alt="Portrait of Satish"
            width={900}
            height={1200}
            priority
            className="h-auto w-full object-cover"
            sizes="(min-width: 768px) 300px, 250px"
          />
          <motion.div
            className="pointer-events-none absolute inset-0 mix-blend-screen"
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
  );
}
