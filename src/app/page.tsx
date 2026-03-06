"use client";

import { aboutSection } from "@/src/app/about/content";
import { contactSection } from "@/src/app/contact/content";
import { educationSection } from "@/src/app/education/content";
import { experienceSection } from "@/src/app/experience/content";
import { homeSection } from "@/src/app/home/content";
import { projectsSection } from "@/src/app/projects/content";
import type { PortfolioSection } from "@/src/components/portfolio/types";
import { ScrollStatus } from "@/src/components/scroll-status";
import { HeroSection } from "@/src/components/sections/HeroSection";
import { RevealSection } from "@/src/components/sections/RevealSection";

const sections: readonly PortfolioSection[] = [
  aboutSection,
  experienceSection,
  projectsSection,
  educationSection,
  contactSection,
];

const heroHeadlines = [
  homeSection.headline,
  "Full Stack Developer building scalable, user-first web products.",
] as const;

export default function Home() {
  return (
    <main className="bg-transparent">
      <ScrollStatus
        sections={[{ id: homeSection.id }, ...sections.map((section) => ({ id: section.id }))]}
      />

      <HeroSection
        homeSection={homeSection}
        heroHeadlines={heroHeadlines}
        contactInfo={contactSection.contactInfo}
        cv={contactSection.cv}
      />

      {sections.map((section) => (
        <RevealSection key={section.id} section={section} />
      ))}
    </main>
  );
}
