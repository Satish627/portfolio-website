"use client";

import { useEffect, useRef, useState } from "react";
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
import {
  Check,
  Clock3,
  Copy,
  Download,
  ExternalLink,
  GraduationCap,
  Mail,
  Phone,
} from "lucide-react";
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

type StoryStep = {
  phase: string;
  title: string;
  description: string;
};

type EducationMilestone = {
  period: string;
  institution: string;
  location: string;
  program: string;
  status: string;
  summary: string;
  focus: readonly string[];
  logo?: string;
  website: string;
};

type ContactInfoItem = {
  label: string;
  value: string;
  href: string;
};

type ContactCv = {
  label: string;
  href: string;
};

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
          {"kicker" in section ? section.kicker : "Section"}
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

        {"storySteps" in section && section.storySteps ? (
          <HorizontalStoryStepper steps={section.storySteps} />
        ) : null}

        {"milestones" in section && section.milestones ? (
          <EducationTimeline milestones={section.milestones} />
        ) : null}

        {"contactInfo" in section && section.contactInfo && "cv" in section && section.cv ? (
          <ContactCollaborationGrid
            availability={section.availability}
            contactInfo={section.contactInfo}
            cv={section.cv}
          />
        ) : null}
      </motion.div>
    </motion.section>
  );
}

function HorizontalStoryStepper({
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

function EducationTimeline({
  milestones,
}: {
  milestones: readonly EducationMilestone[];
}) {
  const timelineRef = useRef<HTMLDivElement | null>(null);
  const timelineInView = useInView(timelineRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [hoveredMilestone, setHoveredMilestone] = useState<string | null>(null);

  return (
    <motion.div
      ref={timelineRef}
      className="relative mt-4 w-full overflow-visible rounded-3xl border border-border/70 bg-gradient-to-b from-card via-card/95 to-card/75 p-4 shadow-sm md:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={timelineInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -right-20 -top-24 h-56 w-56 rounded-full bg-primary/12 blur-3xl"
        animate={
          reduceMotion || !timelineInView
            ? { opacity: 0.45, scale: 1 }
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
            {milestones.map((milestone, index) => (
              <motion.a
                key={`${milestone.period}-${milestone.institution}`}
                href={milestone.website}
                target="_blank"
                rel="noreferrer"
                aria-label={`Visit ${milestone.institution} website`}
                onHoverStart={() =>
                  setHoveredMilestone(`${milestone.period}-${milestone.institution}`)
                }
                onHoverEnd={() =>
                  setHoveredMilestone((current) =>
                    current === `${milestone.period}-${milestone.institution}`
                      ? null
                      : current
                  )
                }
                onFocus={() =>
                  setHoveredMilestone(`${milestone.period}-${milestone.institution}`)
                }
                onBlur={() =>
                  setHoveredMilestone((current) =>
                    current === `${milestone.period}-${milestone.institution}`
                      ? null
                      : current
                  )
                }
                initial={
                  reduceMotion
                    ? { opacity: 0 }
                    : {
                        opacity: 0,
                        x: index % 2 === 0 ? -26 : 26,
                        y: 20,
                        filter: "blur(8px)",
                      }
                }
                animate={
                  timelineInView
                    ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" }
                    : reduceMotion
                      ? { opacity: 0 }
                      : {
                          opacity: 0,
                          x: index % 2 === 0 ? -26 : 26,
                          y: 20,
                          filter: "blur(8px)",
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
                        y: -4,
                        scale: 1.01,
                        transition: { type: "spring", stiffness: 200, damping: 18 },
                      }
                }
                className="group relative block rounded-2xl border border-border/75 bg-background/90 p-4 shadow-[0_18px_40px_-26px_rgba(0,0,0,0.5)] backdrop-blur-md transition-colors hover:border-primary/45 md:p-5"
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

                <div className="flex flex-wrap items-start gap-4">
                  {milestone.logo ? (
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-border/80 bg-white p-1.5 shadow-sm">
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
                      <h3 className="text-lg font-semibold tracking-tight md:text-xl">
                        {milestone.institution}
                      </h3>
                      <ExternalLink className="h-4 w-4 text-primary/80 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />

                      <motion.div
                        className="pointer-events-none absolute bottom-full left-0 z-10 mb-2 hidden min-w-[200px] rounded-xl border border-primary/20 bg-background/95 p-2.5 shadow-lg md:block"
                        initial={false}
                        animate={
                          hoveredMilestone === `${milestone.period}-${milestone.institution}`
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
                    <p className="text-sm text-muted-foreground">
                      {milestone.program} · {milestone.location}
                    </p>
                    <p className="mt-3 text-sm text-muted-foreground md:text-base">
                      {milestone.summary}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {milestone.focus.map((focusItem) => (
                        <span
                          key={`${milestone.institution}-${focusItem}`}
                          className="rounded-full border border-border/70 bg-card px-2.5 py-1 text-xs font-medium text-foreground/85"
                        >
                          {focusItem}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

              </motion.a>
            ))}
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

function ContactCollaborationGrid({
  availability,
  contactInfo,
  cv,
}: {
  availability: readonly string[];
  contactInfo: readonly ContactInfoItem[];
  cv: ContactCv;
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const contactInView = useInView(contactRef, { once: false, amount: 0.25 });
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1500);
    } catch {
      setEmailCopied(false);
    }
  };

  return (
    <motion.div
      ref={contactRef}
      className="mt-4 grid w-full gap-4 md:grid-cols-[1.1fr_0.9fr]"
      initial={{ opacity: 0, y: 18 }}
      animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <div className="rounded-2xl border border-border/75 bg-card/85 p-5 shadow-sm backdrop-blur">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Mail className="h-4 w-4 text-primary" />
          Contact Info
        </div>
        <div className="mt-4 grid gap-3">
          {contactInfo.map((item, index) => (
            <motion.article
              key={item.label}
              initial={{ opacity: 0, x: -16 }}
              animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
              transition={{
                duration: 0.42,
                delay: index * 0.1,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="rounded-xl border border-border/75 bg-background/80 p-3"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                {item.label}
              </p>
              <div className="mt-1 flex items-center gap-2">
                <a
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label === "Phone" ? <Phone className="h-3.5 w-3.5" /> : null}
                  {item.label === "Email" ? <Mail className="h-3.5 w-3.5" /> : null}
                  <span className="break-all">{item.value}</span>
                  {item.href.startsWith("http") ? (
                    <ExternalLink className="h-3.5 w-3.5" />
                  ) : null}
                </a>
                {item.label === "Email" ? (
                  <button
                    type="button"
                    onClick={() => handleCopyEmail(item.value)}
                    className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-border/70 bg-background/80 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label={emailCopied ? "Email copied" : "Copy email"}
                    title={emailCopied ? "Copied" : "Copy email"}
                  >
                    {emailCopied ? (
                      <Check className="h-3.5 w-3.5 text-primary" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                ) : null}
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <motion.aside
        className="rounded-2xl border border-border/75 bg-gradient-to-br from-card to-card/80 p-5 shadow-sm"
        initial={{ opacity: 0, x: 16 }}
        animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
        transition={{ duration: 0.48, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
      >
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Clock3 className="h-4 w-4 text-primary" />
          Currently Open To
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {availability.map((item, index) => (
            <motion.span
              key={item}
              initial={{ opacity: 0, y: 8 }}
              animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
              transition={{
                duration: 0.35,
                delay: 0.16 + index * 0.08,
                ease: [0.2, 0.8, 0.2, 1],
              }}
              className="rounded-full border border-border/75 bg-background px-3 py-1 text-xs font-medium text-foreground/90"
            >
              {item}
            </motion.span>
          ))}
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          If you have a project idea or role in mind, I am happy to discuss scope,
          goals, and practical next steps.
        </p>
        <Button asChild className="mt-4 w-full sm:w-auto">
          <a href={cv.href} download>
            <Download className="h-4 w-4" />
            {cv.label}
          </a>
        </Button>
      </motion.aside>
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
