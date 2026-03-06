"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Check, Copy, Download, Mail } from "lucide-react";
import { itemVariants, sectionVariants, staggerVariants } from "@/src/components/portfolio/motion";
import type {
  ContactCv,
  ContactInfoItem,
  HomeSectionContent,
} from "@/src/components/portfolio/types";
import { Button } from "@/src/components/ui/button";
import { HeroImageCard } from "@/src/components/sections/HeroImageCard";

function GitHubBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M12 .297a12 12 0 0 0-3.79 23.388c.6.113.82-.258.82-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416a3.18 3.18 0 0 0-1.338-1.756c-1.093-.745.084-.729.084-.729a2.52 2.52 0 0 1 1.84 1.234 2.56 2.56 0 0 0 3.495 1 2.56 2.56 0 0 1 .76-1.604c-2.665-.304-5.467-1.334-5.467-5.93a4.64 4.64 0 0 1 1.236-3.22 4.3 4.3 0 0 1 .117-3.176s1.008-.322 3.3 1.23a11.5 11.5 0 0 1 6.006 0c2.291-1.552 3.297-1.23 3.297-1.23a4.3 4.3 0 0 1 .12 3.176 4.63 4.63 0 0 1 1.236 3.22c0 4.61-2.807 5.624-5.48 5.921a2.87 2.87 0 0 1 .823 2.22v3.293c0 .322.216.694.825.576A12 12 0 0 0 12 .297z" />
    </svg>
  );
}

function LinkedInBrandIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className={className}
      fill="currentColor"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.854 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

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
  const [emailCopied, setEmailCopied] = useState(false);
  const displayedHeadline = reduceMotion ? heroHeadlines[0] : typedHeadline || "\u00A0";

  const githubLink = contactInfo.find((item) => item.label.toLowerCase() === "github");
  const linkedInLink = contactInfo.find((item) => item.label.toLowerCase() === "linkedin");
  const emailLink = contactInfo.find((item) => item.label.toLowerCase() === "email");

  const handleCopyEmail = async () => {
    if (!emailLink) return;
    try {
      await navigator.clipboard.writeText(emailLink.value);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 1400);
    } catch {
      setEmailCopied(false);
    }
  };

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

          <motion.div className="flex flex-wrap items-center gap-2" variants={itemVariants}>
            {githubLink ? (
              <Button asChild variant="outline">
                <a href={githubLink.href} target="_blank" rel="noreferrer" aria-label="GitHub profile">
                  <GitHubBrandIcon className="h-4 w-4" />
                  GitHub
                </a>
              </Button>
            ) : null}
            {linkedInLink ? (
              <Button asChild variant="outline">
                <a href={linkedInLink.href} target="_blank" rel="noreferrer" aria-label="LinkedIn profile">
                  <LinkedInBrandIcon className="h-4 w-4" />
                  LinkedIn
                </a>
              </Button>
            ) : null}
          </motion.div>

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
            {emailLink ? (
              <div className="inline-flex max-w-full items-center gap-1 rounded-md border border-border bg-background/70 px-3 py-2 text-sm">
                <a
                  href={emailLink.href}
                  className="inline-flex min-w-0 items-center gap-2 break-all font-medium text-foreground"
                >
                  <Mail className="h-4 w-4 text-primary" />
                  {emailLink.value}
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border/70 bg-background text-muted-foreground transition-colors hover:text-foreground"
                  aria-label={emailCopied ? "Email copied" : "Copy email"}
                  title={emailCopied ? "Copied" : "Copy email"}
                >
                  {emailCopied ? (
                    <Check className="h-3.5 w-3.5 text-primary" />
                  ) : (
                    <Copy className="h-3.5 w-3.5" />
                  )}
                </button>
              </div>
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
