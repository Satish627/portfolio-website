export const projectsSection = {
  id: "projects",
  title: "Projects",
  description:
    "Explore real applications where I combine frontend architecture, performance, and user-focused design.",
  details: [
    "I build practical products with modern web stacks, focusing on clean architecture, smooth interactions, and measurable performance.",
    "Each project is treated as an end-to-end system, from interface design and component structure to API integration and deployment readiness.",
  ],
  featuredProjects: [
    {
      title: "Restaurant Website & Online Ordering App",
      category: "Bachelor Project",
      summary:
        "Built a full-stack ordering platform for menu browsing, ordering, and payment simulation with secure auth flows and scalable API design.",
      highlight: "Integrated Stripe, Redux, and Dockerized deployment workflow.",
      stack: ["MERN Stack", "Tailwind CSS", "Redux", "Stripe", "Docker"],
    },
    {
      title: "Employee Management System",
      category: "Client-Server Project",
      summary:
        "Developed a Java-based employee management system with a JavaFX client and server-side architecture using clear MVVM separation.",
      highlight: "Implemented Java RMI communication and PostgreSQL-backed persistence.",
      stack: ["Java", "JavaFX", "RMI", "PostgreSQL", "MVVM"],
    },
    {
      title: "Sauna Monitoring IoT Solution",
      category: "Data & IoT Project",
      summary:
        "Designed an IoT monitoring flow for real-time sauna temperature and moisture data with dashboard-driven insights.",
      highlight:
        "Created interactive Power BI visualizations connected to a cleaned data warehouse pipeline.",
      stack: ["IoT Sensors", "Android", "Power BI", "Data Warehouse", "ETL"],
    },
    {
      title: "Real-Time Chat Application",
      category: "Hobby Project",
      summary:
        "Built a secure chat platform with real-time messaging, authenticated sessions, and responsive UI architecture.",
      highlight:
        "Implemented WebSocket messaging with Socket.io and state handling via Zustand.",
      stack: ["React.js", "Node.js", "MongoDB", "Socket.io", "JWT", "Zustand"],
    },
  ],
} as const;
