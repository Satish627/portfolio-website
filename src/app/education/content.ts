export const educationSection = {
  id: "education",
  title: "Education",
  description:
    "My learning path in software engineering, from academic foundations to practical system-building experience.",
  details: [
    "I continuously strengthen core computer science fundamentals while applying them in real project work.",
    "Beyond formal study, I learn through building products, experimenting with new tools, and refining systems based on feedback.",
  ],
  milestones: [
    {
      period: "February 2020 - February 2024",
      institution: "VIA University College",
      location: "Horsens, Denmark",
      program: "Bachelor of Engineering in Software Technology",
      status: "Graduated",
      summary:
        "Built a strong base in software engineering principles, object-oriented development, and collaborative project delivery.",
      focus: [
        "Programming fundamentals",
        "Data structures and algorithms",
        "Team-based software projects",
      ],
      logo: "/via_logo.jpg",
      website: "https://en.via.dk/",
    },
    {
      period: "September 2024 - June 2026",
      institution: "Technical University of Denmark (DTU)",
      location: "Copenhagen, Denmark",
      program: "Master's in Computer Science",
      status: "In progress",
      summary:
        "Advancing into modern web systems, scalable architecture, and engineering practices for production-grade applications.",
      focus: [
        "Network Security",
        "Process Mining",
        "Functional Programming",
      ],
      logo: "/dtu_logo.png",
      website: "https://www.dtu.dk/english",
    },
  ],
} as const;
