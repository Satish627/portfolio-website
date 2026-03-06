"use client";

import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { BriefcaseBusiness, Mail, Phone, Send, Sparkles } from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Input } from "@/src/components/ui/input";
import { Textarea } from "@/src/components/ui/textarea";
import type { ContactInfoItem } from "@/src/components/portfolio/types";

export function ContactCollaborationGrid({
  availability,
  contactInfo,
}: {
  availability: readonly string[];
  contactInfo: readonly ContactInfoItem[];
}) {
  const contactRef = useRef<HTMLDivElement | null>(null);
  const openToWorkRef = useRef<HTMLSpanElement | null>(null);
  const contactInView = useInView(contactRef, { once: false, amount: 0.25 });
  const reduceMotion = useReducedMotion();

  const [name, setName] = useState("");
  const [senderEmail, setSenderEmail] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [submitMessage, setSubmitMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const primaryEmail = contactInfo.find((item) => item.label === "Email");
  const phone = contactInfo.find((item) => item.label === "Phone");
  const formspreeEndpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT;

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isSubmitting) {
      return;
    }

    if (!formspreeEndpoint) {
      setSubmitMessage(
        "Form is not configured yet. Add NEXT_PUBLIC_FORMSPREE_ENDPOINT to enable submissions."
      );
      return;
    }

    // Honeypot trap: real users should never fill this hidden field.
    if (website.trim().length > 0) {
      setSubmitMessage("Message sent. Thank you for reaching out.");
      setName("");
      setSenderEmail("");
      setMessage("");
      setWebsite("");
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage(null);

    try {
      const response = await fetch(formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: senderEmail.trim(),
          message: message.trim(),
          _gotcha: website.trim(),
        }),
      });

      if (!response.ok) {
        setSubmitMessage("Could not send message right now. Please try again shortly.");
        return;
      }

      setName("");
      setSenderEmail("");
      setMessage("");
      setWebsite("");
      setSubmitMessage("Message sent. Thank you for reaching out.");
    } catch {
      setSubmitMessage("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
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
              Send a message directly from the contact section
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
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, x: -16 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -16 }}
            transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
            className="rounded-2xl border border-border/70 bg-background/75 p-4 backdrop-blur md:p-5"
          >
            <div className="grid gap-3">
              <label className="grid gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Your Name
                </span>
                <Input
                  required
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Shakti Maan"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Your Email
                </span>
                <Input
                  type="email"
                  required
                  value={senderEmail}
                  onChange={(event) => setSenderEmail(event.target.value)}
                  placeholder="shakti@email.com"
                />
              </label>

              <label className="grid gap-1.5">
                <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Message
                </span>
                <Textarea
                  required
                  rows={6}
                  value={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Tell me about your role, project, or idea..."
                />
              </label>

              <label
                className="absolute left-[-9999px] top-auto h-px w-px overflow-hidden"
                aria-hidden="true"
              >
                Website
                <input
                  type="text"
                  name="_gotcha"
                  tabIndex={-1}
                  autoComplete="off"
                  value={website}
                  onChange={(event) => setWebsite(event.target.value)}
                />
              </label>

              <Button type="submit" className="mt-1 w-full sm:w-fit" disabled={isSubmitting}>
                <Send className="h-4 w-4" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>

              {submitMessage ? <p className="text-sm text-muted-foreground">{submitMessage}</p> : null}
            </div>
          </motion.form>

          <motion.aside
            className="relative overflow-hidden rounded-2xl border border-border/70 bg-gradient-to-br from-slate-100/85 via-background to-zinc-100/60 p-5 shadow-sm dark:from-slate-900 dark:via-zinc-950 dark:to-slate-900"
            initial={{ opacity: 0, x: 16 }}
            animate={contactInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={{ duration: 0.48, delay: 0.08, ease: [0.2, 0.8, 0.2, 1] }}
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
                    className="rounded-full border border-border/75 bg-background/75 px-3 py-1 text-xs font-medium text-foreground/90"
                  >
                    {item}
                  </motion.span>
                ))}
              </div>

              <div className="mt-5 grid gap-2 text-sm">
                {primaryEmail ? (
                  <a
                    href={primaryEmail.href}
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                  >
                    <Mail className="h-4 w-4" />
                    {primaryEmail.value}
                  </a>
                ) : null}
                {phone ? (
                  <a
                    href={phone.href}
                    className="inline-flex items-center gap-2 text-foreground transition-colors hover:text-primary"
                  >
                    <Phone className="h-4 w-4" />
                    {phone.value}
                  </a>
                ) : null}
              </div>

              <p className="mt-4 text-sm text-muted-foreground">
                Messages are sent directly from this form.
              </p>
            </div>
          </motion.aside>
        </div>
      </div>
    </motion.div>
  );
}
