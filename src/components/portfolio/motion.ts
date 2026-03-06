import type { Variants } from "framer-motion";

export const sectionVariants: Variants = {
  hidden: { opacity: 0.15 },
  visible: {
    opacity: 1,
    transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const staggerVariants: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.06,
    },
  },
};

export const itemVariants: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.97, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] },
  },
};

export const lineVariants: Variants = {
  hidden: { scaleX: 0, opacity: 0, transformOrigin: "left center" },
  visible: {
    scaleX: 1,
    opacity: 1,
    transition: { duration: 0.65, ease: [0.2, 0.8, 0.2, 1] },
  },
};
