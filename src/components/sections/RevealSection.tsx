"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { lineVariants, itemVariants, sectionVariants, staggerVariants } from "@/src/components/portfolio/motion";
import type { PortfolioSection } from "@/src/components/portfolio/types";
import { ContactCollaborationGrid } from "@/src/components/features/ContactCollaborationGrid";
import { EducationTimeline } from "@/src/components/features/EducationTimeline";
import { ExperienceTimeline } from "@/src/components/features/ExperienceTimeline";
import { HorizontalStoryStepper } from "@/src/components/features/HorizontalStoryStepper";
import { ProjectsShowcase } from "@/src/components/features/ProjectsShowcase";

export function RevealSection({ section }: { section: PortfolioSection }) {
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
        <motion.div className="mb-2 h-1 w-24 rounded-full bg-primary/70" variants={lineVariants} />
        <motion.p
          className="text-sm uppercase tracking-[0.16em] text-muted-foreground"
          variants={itemVariants}
        >
          {section.kicker ?? "Section"}
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

        {section.storySteps ? <HorizontalStoryStepper steps={section.storySteps} /> : null}
        {section.milestones ? <EducationTimeline milestones={section.milestones} /> : null}
        {section.experienceItems ? <ExperienceTimeline items={section.experienceItems} /> : null}
        {section.featuredProjects ? <ProjectsShowcase projects={section.featuredProjects} /> : null}
        {section.contactInfo && section.availability ? (
          <ContactCollaborationGrid
            availability={section.availability}
            contactInfo={section.contactInfo}
          />
        ) : null}
      </motion.div>
    </motion.section>
  );
}
