"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion, useInView, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  Copy,
  Download,
  Mail,
  Phone,
  Sparkles,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import type { ContactCv, ContactInfoItem } from "@/src/components/portfolio/types";

export function ContactCollaborationGrid({
  availability,
  contactInfo,
  cv,
}: {
  availability: readonly string[];
  contactInfo: readonly ContactInfoItem[];
  cv: ContactCv;
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const openToWorkRef = useRef<HTMLSpanElement | null>(null);
  const contactInView = useInView(contactRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();
  const [emailCopied, setEmailCopied] = useState(false);
  const primaryEmail = contactInfo.find((item) => item.label === "Email");

  useEffect(() => {
    if (reduceMotion || !openToWorkRef.current) return;

    const animation = anime({
      targets: openToWorkRef.current,
      translateY: [0, -2.5],
      scale: [1, 1.03],
      duration: 1800,
      easing: "easeInOutSine",
      direction: "alternate",
      loop: true,
    });

    return () => animation.pause();
  }, [reduceMotion]);

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
          <span
            ref={openToWorkRef}
            className="rounded-full border border-emerald-300/60 bg-emerald-100/70 px-3 py-1 text-xs font-medium text-emerald-900 dark:border-emerald-300/30 dark:bg-emerald-500/15 dark:text-emerald-100"
          >
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
