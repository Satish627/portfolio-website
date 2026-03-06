export type StoryStep = {
  phase: string;
  title: string;
  description: string;
};

export type EducationMilestone = {
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

export type ProjectItem = {
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

export type ExperienceItem = {
  role: string;
  company: string;
  period: string;
  location: string;
  summary: string;
  highlights: readonly string[];
  type: string;
};

export type ContactInfoItem = {
  label: string;
  value: string;
  href: string;
};

export type ContactCv = {
  label: string;
  href: string;
};

export type PortfolioSection = {
  id: string;
  kicker?: string;
  title: string;
  description: string;
  details?: readonly string[];
  storySteps?: readonly StoryStep[];
  milestones?: readonly EducationMilestone[];
  experienceItems?: readonly ExperienceItem[];
  featuredProjects?: readonly ProjectItem[];
  availability?: readonly string[];
  contactInfo?: readonly ContactInfoItem[];
  cv?: ContactCv;
};

export type HomeCta = {
  label: string;
  href: string;
  variant?: "default" | "outline";
};

export type HomeSectionContent = {
  id: string;
  badge: string;
  headline: string;
  paragraphs: readonly string[];
  ctas: readonly HomeCta[];
};
