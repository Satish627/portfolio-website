export const experienceSection = {
  id: "experience",
  kicker: "Built In Real Teams",
  title: "Experience",
  description:
    "Professional experience where I shipped product features, collaborated across teams, and improved frontend and backend quality.",
  details: [
    "I focus on building reliable features that balance product goals with strong engineering quality.",
    "My experience includes hands-on delivery in real teams, from implementation and testing to deployment readiness.",
  ],
  experienceItems: [
    {
      role: "Student Developer",
      company: "Nearby rentals",
      period: "January 2025 - Present",
      location: "Copenhagen, Denmark",
      summary:
        "Developed and maintained product features across frontend and backend, contributing to platform stability and performance.",
      highlights: [
        "Implemented and tested new functionality before production deployment.",
        "Improved architecture, code quality, and user experience with cross-functional collaboration.",
        "Worked with test environments and debugging workflows for safer releases.",
      ],
      type: "Current Role",
    },
    {
      role: "Frontend Development Intern",
      company: "ParkShare",
      period: "January 2022 - July 2022",
      location: "Aarhus, Denmark",
      summary:
        "Built responsive, component-driven interfaces with React and Tailwind in an Agile team setup.",
      highlights: [
        "Collaborated with designers and backend developers in sprint cycles.",
        "Managed state with React Hooks and resolved cross-browser UI issues.",
        "Participated in code reviews and feature refinement for usability improvements.",
      ],
      type: "Internship",
    },
  ],
} as const;
