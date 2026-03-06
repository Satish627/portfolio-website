export const projectsSection = {
  id: "projects",
  kicker: "Ideas Into Products",
  title: "Projects",
  description:
    "Explore real applications where I combine frontend architecture, performance, and user-focused design.",
  details: [
    "I build practical products with modern web stacks, focusing on clean architecture, smooth interactions, and measurable performance.",
    "Each project is treated as an end-to-end system, from interface design and component structure to API integration and deployment readiness.",
  ],
  featuredProjects: [
    {
      title: "Process-Oriented Event-Driven Software Project",
      category: "Master's Project",
      summary:
        "Course project focused on process-oriented and event-driven software design with collaborative implementation.",
      highlight:
        "Built as a team-oriented master's project with event-driven architecture principles.",
      stack: ["TypeScript", "Event-Driven Design", "Process-Oriented Architecture"],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/MrSachin7/-02268-Process-Oriented-Event-Driven-Software-Project",
        },
      ],
    },
    {
      title: "RoboRally Platform (Team Project)",
      category: "Master's Team Project",
      summary:
        "Collaborative RoboRally system delivered through separate frontend and backend repositories under a shared organization.",
      highlight:
        "Worked in a coordinated team setup with dedicated frontend and backend codebases.",
      stack: ["TypeScript", "C#", "Frontend/Backend Separation", "Team Collaboration"],
      links: [
        {
          label: "Organization",
          href: "https://github.com/SoftwareEngineering2-G",
        },
        {
          label: "Frontend Repo",
          href: "https://github.com/SoftwareEngineering2-G/Roborally-frontend",
        },
        {
          label: "Backend Repo",
          href: "https://github.com/SoftwareEngineering2-G/Roborally-backend",
        },
      ],
    },
    {
      title: "MiniCraft",
      category: "Graphics / Systems Project",
      summary:
        "Experimental project exploring mini game/simulation mechanics and system-level implementation concepts.",
      highlight:
        "Focused on interactive system behavior and practical implementation experiments.",
      stack: ["Programming Fundamentals", "Interactive Systems", "Project Architecture"],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Satish627/MiniCraft",
        },
      ],
    },
    {
      title: "DataSecurityA2",
      category: "Security Assignment",
      summary:
        "Academic security-focused implementation covering practical data protection and secure coding concepts.",
      highlight:
        "Explored applied security concepts through a hands-on Java implementation.",
      stack: ["Java", "Data Security", "Secure Coding"],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Satish627/DataSecurityA2",
        },
      ],
    },
    {
      title: "ExpenseTrackerApp",
      category: "Application Development",
      summary:
        "Personal finance tracker application for managing expenses and basic budgeting workflows.",
      highlight: "Built a practical tracking workflow with Java application structure.",
      stack: ["Java", "Application Design", "Data Handling"],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Satish627/ExpenseTrackerApp",
        },
      ],
    },
    {
      title: "Restaurant Website & Online Ordering App",
      category: "Bachelor Project",
      summary:
        "Built a full-stack ordering platform for menu browsing, ordering, and payment simulation with secure auth flows and scalable API design.",
      highlight: "Integrated Stripe, Redux, and Dockerized deployment workflow.",
      stack: ["MERN Stack", "Tailwind CSS", "Redux", "Stripe", "Docker"],
      links: [
        {
          label: "Project Overview",
          href: "/#projects",
        },
      ],
    },
    {
      title: "Employee Management System",
      category: "Client-Server Project",
      summary:
        "Developed a Java-based employee management system with a JavaFX client and server-side architecture using clear MVVM separation.",
      highlight: "Implemented Java RMI communication and PostgreSQL-backed persistence.",
      stack: ["Java", "JavaFX", "RMI", "PostgreSQL", "MVVM"],
      links: [
        {
          label: "Project Overview",
          href: "/#projects",
        },
      ],
    },
    {
      title: "Sauna Monitoring IoT Solution",
      category: "Data & IoT Project",
      summary:
        "Designed an IoT monitoring flow for real-time sauna temperature and moisture data with dashboard-driven insights.",
      highlight:
        "Created interactive Power BI visualizations connected to a cleaned data warehouse pipeline.",
      stack: ["IoT Sensors", "Android", "Power BI", "Data Warehouse", "ETL"],
      links: [
        {
          label: "Project Overview",
          href: "/#projects",
        },
      ],
    },
    {
      title: "Real-Time Chat Application",
      category: "Hobby Project",
      summary:
        "Built a secure chat platform with real-time messaging, authenticated sessions, and responsive UI architecture.",
      highlight:
        "Implemented WebSocket messaging with Socket.io and state handling via Zustand.",
      stack: ["React.js", "Node.js", "MongoDB", "Socket.io", "JWT", "Zustand"],
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/Satish627/ChatApp",
        },
      ],
    },
  ],
} as const;
