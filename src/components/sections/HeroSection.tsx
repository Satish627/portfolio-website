"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { itemVariants, sectionVariants, staggerVariants } from "@/src/components/portfolio/motion";
import type {
  ContactCv,
  ContactInfoItem,
  HomeSectionContent,
} from "@/src/components/portfolio/types";
import { Button } from "@/src/components/ui/button";
import { HeroImageCard } from "@/src/components/sections/HeroImageCard";

export function HeroSection({
  homeSection,
  heroHeadlines,
  contactInfo,
  cv,
}: {
  homeSection: HomeSectionContent;
  heroHeadlines: readonly string[];
  contactInfo: readonly ContactInfoItem[];
  cv: ContactCv;
}) {
  const heroRef = useRef<HTMLElement | null>(null);
  const heroInView = useInView(heroRef, { once: false, amount: 0.35 });
  const reduceMotion = useReducedMotion();
  const [typedHeadline, setTypedHeadline] = useState("");
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [isDeletingHeadline, setIsDeletingHeadline] = useState(false);
  const displayedHeadline = reduceMotion ? heroHeadlines[0] : typedHeadline || "\u00A0";

  const githubLink = contactInfo.find((item) => item.label.toLowerCase() === "github");
  const linkedInLink = contactInfo.find((item) => item.label.toLowerCase() === "linkedin");
  const emailLink = contactInfo.find((item) => item.label.toLowerCase() === "email");

  useEffect(() => {
    if (reduceMotion) return;

    const currentHeadline = heroHeadlines[headlineIndex];
    let timeoutId: number;

    if (!isDeletingHeadline && typedHeadline === currentHeadline) {
      timeoutId = window.setTimeout(() => setIsDeletingHeadline(true), 1300);
    } else if (isDeletingHeadline && typedHeadline.length === 0) {
      timeoutId = window.setTimeout(() => {
        setIsDeletingHeadline(false);
        setHeadlineIndex((current) => (current + 1) % heroHeadlines.length);
      }, 220);
    } else {
      const nextLength = typedHeadline.length + (isDeletingHeadline ? -1 : 1);
      timeoutId = window.setTimeout(
        () => setTypedHeadline(currentHeadline.slice(0, nextLength)),
        isDeletingHeadline ? 36 : 62
      );
    }

    return () => window.clearTimeout(timeoutId);
  }, [headlineIndex, heroHeadlines, isDeletingHeadline, reduceMotion, typedHeadline]);

  return (
    <motion.section
      ref={heroRef}
      id={homeSection.id}
      className="scroll-mt-16 border-b"
      initial="hidden"
      animate={heroInView ? "visible" : "hidden"}
      variants={sectionVariants}
    >
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-5xl items-center gap-6 px-4 pb-2 pt-24 md:grid-cols-[1.15fr_0.85fr] md:pb-4 md:pt-28">
        <motion.div className="order-1 flex flex-col gap-4" variants={staggerVariants}>
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
            <span className="inline-block min-h-[1.2em] align-baseline">{displayedHeadline}</span>
            {reduceMotion ? null : (
              <motion.span
                aria-hidden="true"
                className="ml-1 inline-block text-primary/85"
                animate={{ opacity: [0.25, 1, 0.25] }}
                transition={{ duration: 0.95, repeat: Infinity, ease: "easeInOut" }}
              >
                |
              </motion.span>
            )}
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

          <motion.div className="flex flex-wrap items-center gap-2" variants={itemVariants}>
            {githubLink ? (
              <Button asChild variant="outline" size="icon">
                <a href={githubLink.href} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <Github className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {linkedInLink ? (
              <Button asChild variant="outline" size="icon">
                <a href={linkedInLink.href} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <Linkedin className="h-4 w-4" />
                </a>
              </Button>
            ) : null}
            {emailLink ? (
              <Button asChild variant="outline">
                <a href={emailLink.href}>
                  <Mail className="h-4 w-4" />
                  Email
                </a>
              </Button>
            ) : null}
            <Button asChild>
              <a href={cv.href} download>
                <Download className="h-4 w-4" />
                {cv.label}
              </a>
            </Button>
          </motion.div>
        </motion.div>

        <HeroImageCard inView={heroInView} />
      </div>
    </motion.section>
  );
}
