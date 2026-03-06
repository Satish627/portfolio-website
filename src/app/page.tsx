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
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  ChevronUp,
  Code2,
  Copy,
  Download,
  ExternalLink,
  FolderKanban,
  GraduationCap,
  Mail,
  Phone,
  Rocket,
  Sparkles,
} from "lucide-react";
import { aboutSection } from "@/src/app/about/content";
import { contactSection } from "@/src/app/contact/content";
import { educationSection } from "@/src/app/education/content";
import { experienceSection } from "@/src/app/experience/content";
import { homeSection } from "@/src/app/home/content";
import { projectsSection } from "@/src/app/projects/content";
import { ScrollStatus } from "@/src/components/scroll-status";
import { Button } from "@/src/components/ui/button";

const sections = [
  aboutSection,
  experienceSection,
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

type ProjectItem = {
  title: string;
  category: string;
  summary: string;
  highlight: string;
  stack: readonly string[];
  links?: readonly {
    label: string;
    href: string;
  }[];
};

type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: readonly string[];
  type: string;
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
            className="order-1 flex flex-col gap-4"
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
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.2 });

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

        {"experienceItems" in section && section.experienceItems ? (
          <ExperienceTimeline items={section.experienceItems} />
        ) : null}

        {"featuredProjects" in section && section.featuredProjects ? (
          <ProjectsShowcase projects={section.featuredProjects} />
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

function ProjectsShowcase({
  projects,
}: {
  projects: readonly ProjectItem[];
}) {
  const projectsRef = useRef<HTMLDivElement | null>(null);
  const projectsInView = useInView(projectsRef, { once: false, amount: 0.15 });
  const reduceMotion = useReducedMotion();
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projectIcons = [Rocket, Code2, FolderKanban] as const;
  const visibleProjects = showAllProjects ? projects : projects.slice(0, 4);
  const shouldRevealProjects = projectsInView || showAllProjects;

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
          <span className="rounded-full border border-border/70 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/80">
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

function ExperienceTimeline({
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

                <h4 className="mt-2 text-lg font-semibold tracking-tight">
                  {item.role}
                </h4>
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
  const reduceMotion = useReducedMotion();
  const [emailCopied, setEmailCopied] = useState(false);
  const primaryEmail = contactInfo.find((item) => item.label === "Email");

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
      className="relative mt-6 w-full"
      initial={{ opacity: 0, y: 18 }}
      animate={contactInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.48, ease: [0.2, 0.8, 0.2, 1] }}
    >
      <motion.div
        className="pointer-events-none absolute -left-10 -top-8 h-44 w-44 rounded-full bg-slate-300/25 blur-3xl dark:bg-slate-500/25"
        animate={
          reduceMotion || !contactInView
            ? { opacity: 0.6, scale: 1 }
            : { opacity: [0.35, 0.7, 0.35], scale: [0.94, 1.08, 0.94] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 5, repeat: Infinity, ease: "easeInOut" }
        }
      />
      <motion.div
        className="pointer-events-none absolute -bottom-10 right-2 h-40 w-40 rounded-full bg-zinc-300/20 blur-3xl dark:bg-zinc-500/25"
        animate={
          reduceMotion || !contactInView
            ? { opacity: 0.5, scale: 1 }
            : { opacity: [0.3, 0.65, 0.3], scale: [1, 1.12, 1] }
        }
        transition={
          reduceMotion
            ? undefined
            : { duration: 6.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
        }
      />

      <div className="relative rounded-3xl border border-border/70 bg-gradient-to-b from-background/85 via-card/90 to-card/70 p-5 shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)] backdrop-blur-xl md:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
              <Sparkles className="h-3.5 w-3.5" />
              Let&apos;s Connect
            </p>
            <h3 className="mt-1 text-xl font-semibold tracking-tight md:text-2xl">
              Available for software roles and freelance projects
            </h3>
          </div>
          <span className="rounded-full border border-emerald-300/60 bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-500/15 dark:text-emerald-100">
            Open To Work
          </span>
        </div>

        <div className="grid gap-4 md:grid-cols-[1.15fr_0.85fr]">
          <div className="grid gap-3">
            {contactInfo.map((item, index) => {
              const isEmail = item.label === "Email";
              const isExternal = item.href.startsWith("http");

              return (
                <motion.article
                  key={item.label}
                  initial={{ opacity: 0, x: -16 }}
                  animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
                  transition={{
                    duration: 0.42,
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
                  className="group rounded-2xl border border-border/70 bg-background/75 p-3.5 backdrop-blur transition-colors hover:border-primary/45"
                >
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                    {item.label}
                  </p>
                  <div className="mt-1.5 flex items-center gap-2">
                    <a
                      href={item.href}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noreferrer" : undefined}
                      className="inline-flex min-w-0 flex-1 items-center gap-1.5 text-sm font-medium text-foreground transition-colors group-hover:text-primary"
                    >
                      {item.label === "Phone" ? <Phone className="h-3.5 w-3.5" /> : null}
                      {item.label === "Email" ? <Mail className="h-3.5 w-3.5" /> : null}
                      <span className="break-all">{item.value}</span>
                      {isExternal ? <ArrowUpRight className="h-3.5 w-3.5" /> : null}
                    </a>
                    {isEmail ? (
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
              );
            })}
          </div>

          <motion.aside
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-slate-100/85 via-background to-zinc-100/60 p-5 shadow-sm dark:from-slate-900 dark:via-zinc-950 dark:to-slate-900"
            initial={{ opacity: 0, x: 16 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
            whileHover={
              reduceMotion
                ? undefined
                : {
                    y: -3,
                    transition: { type: "spring", stiffness: 200, damping: 18 },
                  }
            }
          >
            <motion.div
              className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-slate-400/20 blur-2xl dark:bg-zinc-400/25"
              animate={
                reduceMotion
                  ? { opacity: 0.55, scale: 1 }
                  : { opacity: [0.35, 0.75, 0.35], scale: [0.95, 1.08, 0.95] }
              }
              transition={
                reduceMotion
                  ? undefined
                  : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
              }
            />

            <div className="relative">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <BriefcaseBusiness className="h-4 w-4 text-primary" />
                Current Focus
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
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    className="rounded-full border border-border/75 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/90"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                Fast response for opportunities and project discussions.
              </p>
              <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                <Button asChild className="sm:flex-1">
                  <a href={cv.href} download>
                    <Download className="h-4 w-4" />
                    {cv.label}
                  </a>
                </Button>
                {primaryEmail ? (
                  <Button asChild variant="outline" className="sm:flex-1">
                    <a href={primaryEmail.href}>
                      <Mail className="h-4 w-4" />
                      Email Me
                    </a>
                  </Button>
                ) : null}
              </div>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
}

function HeroImageCard({ inView }: { inView: boolean }) {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const [spinTurns, setSpinTurns] = useState(0);

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
              animate={
                reduceMotion
                  ? { opacity: 1 }
                  : { opacity: [0.96, 1, 0.96] }
              }
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
              animate={
                reduceMotion
                  ? { opacity: 0.6 }
                  : { opacity: [0.45, 0.78, 0.45] }
              }
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
              animate={
                reduceMotion
                  ? { opacity: 0.55 }
                  : { opacity: [0.38, 0.62, 0.38] }
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
