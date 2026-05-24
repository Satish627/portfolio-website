export const skillsSection = {
  id: "skills",
  kicker: "What I Work With",
  title: "Skills",
  description:
    "Technologies and tools I reach for when building modern, scalable web applications.",
  skillCategories: [
    {
      name: "Frontend",
      skills: [
        { name: "Next.js", level: 88 },
        { name: "React", level: 85 },
        { name: "TypeScript", level: 85 },
        { name: "Tailwind CSS", level: 87 },
        { name: "HTML & CSS", level: 90 },
      ],
    },
    {
      name: "Backend",
      skills: [
        { name: "Node.js", level: 75 },
        { name: "Java", level: 78 },
        { name: "PostgreSQL", level: 70 },
        { name: "MongoDB", level: 72 },
        { name: "REST APIs", level: 82 },
      ],
    },
    {
      name: "Tools & DevOps",
      skills: [
        { name: "Git & GitHub", level: 88 },
        { name: "Docker", level: 65 },
        { name: "Redux / Zustand", level: 72 },
        { name: "Socket.io", level: 65 },
        { name: "Stripe API", level: 68 },
      ],
    },
  ],
} as const;
