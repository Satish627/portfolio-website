"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { BriefcaseBusiness, FolderKanban, GraduationCap, Layers, Mail } from "lucide-react";
import { itemVariants, sectionVariants, staggerVariants } from "@/src/components/portfolio/motion";
import type { PortfolioSection } from "@/src/components/portfolio/types";

const SECTION_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  education: GraduationCap,
  experience: BriefcaseBusiness,
  skills: Layers,
  projects: FolderKanban,
  contact: Mail,
};
import { ContactCollaborationGrid } from "@/src/components/features/ContactCollaborationGrid";
import { EducationTimeline } from "@/src/components/features/EducationTimeline";
import { ExperienceTimeline } from "@/src/components/features/ExperienceTimeline";
import { ProjectsShowcase } from "@/src/components/features/ProjectsShowcase";
import { SkillsShowcase } from "@/src/components/features/SkillsShowcase";
import { VerticalStoryTimeline } from "@/src/components/features/VerticalStoryTimeline";

export function RevealSection({ section }: { section: PortfolioSection }) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const sectionInView = useInView(sectionRef, {
    once: false,
    amount: 0.2,
  });

  const SectionIcon = SECTION_ICONS[section.id];

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
        <motion.div className="flex items-center gap-3" variants={itemVariants}>
          {SectionIcon ? <SectionIcon className="h-3.5 w-3.5 shrink-0 text-primary" /> : null}
          <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
            {section.title}
          </span>
          <div className="h-px flex-1 bg-border/50" />
        </motion.div>

        {section.skillCategories ? <SkillsShowcase categories={section.skillCategories} /> : null}
        {section.storySteps ? <VerticalStoryTimeline steps={section.storySteps} /> : null}
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
