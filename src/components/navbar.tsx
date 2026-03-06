"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  type LucideIcon,
  UserRound,
} from "lucide-react";
import { cn } from "@/src/lib/utils";
import { ThemeToggle } from "@/src/components/theme-toggle";

interface NavItem {
  name: string;
  url: string;
  icon: LucideIcon;
}

interface NavBarProps {
  items?: NavItem[];
  className?: string;
  defaultActive?: string;
}

const defaultItems: NavItem[] = [
  { name: "Home", url: "/#home", icon: House },
  { name: "About", url: "/#about", icon: UserRound },
  { name: "Experience", url: "/#experience", icon: BriefcaseBusiness },
  { name: "Projects", url: "/#projects", icon: FolderKanban },
  { name: "Education", url: "/#education", icon: GraduationCap },
  { name: "Contact", url: "/#contact", icon: Mail },
];

const NAV_SCROLL_OFFSET = 104;

function AnimeMascot({ isExcited }: { isExcited: boolean }) {
  return (
    <div className="relative h-12 w-12">
      <motion.div
        className="absolute left-1/2 h-10 w-10 -translate-x-1/2 rounded-full bg-white"
        animate={
          isExcited
            ? {
                scale: [1, 1.1, 1],
                rotate: [0, -5, 5, 0],
                transition: { duration: 0.5, ease: "easeInOut" },
              }
            : {
                y: [0, -3, 0],
                transition: { duration: 2, repeat: Infinity, ease: "easeInOut" },
              }
        }
      >
        <motion.div
          className="absolute h-2 w-2 rounded-full bg-black"
          animate={
            isExcited
              ? {
                scaleY: [1, 0.2, 1],
                transition: { duration: 0.2, times: [0, 0.5, 1] },
              }
              : {}
          }
          style={{ left: "25%", top: "40%" }}
        />
        <motion.div
          className="absolute h-2 w-2 rounded-full bg-black"
          animate={
            isExcited
              ? {
                scaleY: [1, 0.2, 1],
                transition: { duration: 0.2, times: [0, 0.5, 1] },
              }
              : {}
          }
          style={{ right: "25%", top: "40%" }}
        />
        <motion.div
          className="absolute h-1.5 w-2 rounded-full bg-pink-300"
          animate={{ opacity: isExcited ? 0.8 : 0.6 }}
          style={{ left: "15%", top: "55%" }}
        />
        <motion.div
          className="absolute h-1.5 w-2 rounded-full bg-pink-300"
          animate={{ opacity: isExcited ? 0.8 : 0.6 }}
          style={{ right: "15%", top: "55%" }}
        />
        <motion.div
          className="absolute h-2 w-4 rounded-full border-b-2 border-black"
          animate={isExcited ? { scaleY: 1.5, y: -1 } : { scaleY: 1, y: 0 }}
          style={{ left: "30%", top: "60%" }}
        />

        <AnimatePresence>
          {isExcited && (
            <>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                className="absolute -right-1 -top-1 h-2 w-2 text-yellow-300"
              >
                *
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0 }}
                transition={{ delay: 0.1 }}
                className="absolute -top-2 left-0 h-2 w-2 text-yellow-300"
              >
                *
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2"
        animate={
          isExcited
            ? {
                y: [0, -4, 0],
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatType: "reverse",
                },
              }
            : {
                y: [0, 2, 0],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              }
        }
      >
        <div className="h-full w-full origin-center rotate-45 bg-white" />
      </motion.div>
    </div>
  );
}

export function Navbar({
  items = defaultItems,
  className,
  defaultActive = "Home",
}: NavBarProps) {
  const pathname = usePathname();
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<string>(defaultActive);

  useEffect(() => {
    if (pathname !== "/") return;

    const updateFromHashOrScroll = () => {
      let current = defaultActive;
      const scrollPosition = window.scrollY + NAV_SCROLL_OFFSET + 12;

      for (const item of items) {
        if (!item.url.startsWith("/#")) continue;
        const sectionId = item.url.replace("/#", "");
        const sectionElement = document.getElementById(sectionId);
        if (!sectionElement) continue;

        const offsetTop = sectionElement.getBoundingClientRect().top + window.scrollY;
        const offsetBottom = offsetTop + sectionElement.offsetHeight;
        if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
          current = item.name;
          break;
        }
      }

      const lastSection = [...items]
        .reverse()
        .find((item) => item.url.startsWith("/#"));
      if (
        lastSection &&
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 6
      ) {
        current = lastSection.name;
      }

      setActiveTab(current);
    };

    let frameId = window.requestAnimationFrame(updateFromHashOrScroll);
    let isScheduled = false;
    const onPositionChange = () => {
      if (isScheduled) return;
      isScheduled = true;
      frameId = window.requestAnimationFrame(() => {
        isScheduled = false;
        updateFromHashOrScroll();
      });
    };

    window.addEventListener("scroll", onPositionChange, { passive: true });
    window.addEventListener("hashchange", onPositionChange);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onPositionChange);
      window.removeEventListener("hashchange", onPositionChange);
    };
  }, [defaultActive, items, pathname]);

  return (
    <div className={cn("fixed left-0 right-0 top-6 z-[9999] px-4", className)}>
      <div className="flex justify-center pt-6">
        <motion.div
          className="relative flex items-center gap-2 rounded-full border border-border/60 bg-background/65 px-2 py-2 shadow-lg backdrop-blur-xl dark:border-white/15 dark:bg-black/55"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
        >
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.name;
            const isHovered = hoveredTab === item.name;

            return (
              <Link
                key={item.name}
                href={item.url}
                onClick={(event) => {
                  setActiveTab(item.name);
                  if (pathname !== "/" || !item.url.startsWith("/#")) return;

                  event.preventDefault();
                  const targetId = item.url.replace("/#", "");
                  const target = document.getElementById(targetId);
                  if (!target) return;

                  const targetTop =
                    target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
                  window.history.replaceState(null, "", item.url);
                  window.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
                }}
                onMouseEnter={() => setHoveredTab(item.name)}
                onMouseLeave={() => setHoveredTab(null)}
                className={cn(
                  "relative cursor-pointer rounded-full px-4 py-2.5 text-sm font-semibold transition-all duration-300 md:px-6",
                  "text-foreground/70 hover:text-foreground",
                  isActive && "text-foreground"
                )}
              >
                {isActive && (
                  <motion.div
                    className="absolute inset-0 -z-10 overflow-hidden rounded-full"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.03, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <div className="absolute inset-0 rounded-full bg-primary/20 blur-md" />
                    <div className="absolute inset-[-4px] rounded-full bg-primary/15 blur-xl" />
                    <div className="absolute inset-[-8px] rounded-full bg-primary/10 blur-2xl" />
                    <div className="absolute inset-[-12px] rounded-full bg-primary/5 blur-3xl" />
                    <div
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0"
                      style={{ animation: "nav-shine 3s ease-in-out infinite" }}
                    />
                  </motion.div>
                )}

                <motion.span
                  className="relative z-10 hidden md:inline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.name}
                </motion.span>
                <motion.span
                  className="relative z-10 md:hidden"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Icon size={18} strokeWidth={2.5} />
                </motion.span>

                <AnimatePresence>
                  {isHovered && !isActive && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 -z-10 rounded-full bg-foreground/10"
                    />
                  )}
                </AnimatePresence>

                {isActive && (
                  <motion.div
                    layoutId="anime-mascot"
                    className="pointer-events-none absolute -top-12 left-1/2 -translate-x-1/2"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  >
                    <AnimeMascot isExcited={Boolean(hoveredTab)} />
                  </motion.div>
                )}
              </Link>
            );
          })}
          <div className="ml-1 [&_button]:h-10 [&_button]:w-10 [&_button]:rounded-full [&_button]:border-border/60 [&_button]:bg-background/70 dark:[&_button]:border-white/20 dark:[&_button]:bg-black/60">
            <ThemeToggle />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
