"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  BriefcaseBusiness,
  FolderKanban,
  GraduationCap,
  House,
  Mail,
  Menu,
  type LucideIcon,
  UserRound,
} from "lucide-react";
import { Button } from "@/src/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/src/components/ui/sheet";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollToSection = useCallback((
    sectionId: string,
    behavior: ScrollBehavior = "smooth"
  ) => {
    const target = document.getElementById(sectionId);
    if (!target) return false;

    const targetTop =
      target.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({ top: Math.max(0, targetTop), behavior });
    return true;
  }, []);

  const scrollToCurrentHash = useCallback((behavior: ScrollBehavior = "smooth") => {
    const sectionId = window.location.hash.replace(/^#/, "");
    if (!sectionId) return false;
    return scrollToSection(sectionId, behavior);
  }, [scrollToSection]);

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

      const currentItem = items.find(
        (item) => item.name === current && item.url.startsWith("/#")
      );
      if (currentItem) {
        const hash = currentItem.url.replace("/", "");
        if (window.location.hash !== hash) {
          window.history.replaceState(null, "", currentItem.url);
        }
      }
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

    const onHistoryNavigation = () => {
      window.requestAnimationFrame(() => {
        scrollToCurrentHash("smooth");
        onPositionChange();
      });
    };

    window.addEventListener("scroll", onPositionChange, { passive: true });
    window.addEventListener("popstate", onHistoryNavigation);
    window.addEventListener("hashchange", onHistoryNavigation);

    window.requestAnimationFrame(() => {
      scrollToCurrentHash("auto");
    });

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", onPositionChange);
      window.removeEventListener("popstate", onHistoryNavigation);
      window.removeEventListener("hashchange", onHistoryNavigation);
    };
  }, [defaultActive, items, pathname, scrollToCurrentHash]);

  const handleNavItemClick = (
    item: NavItem,
    event?: React.MouseEvent<HTMLAnchorElement>
  ) => {
    setActiveTab(item.name);
    setIsMobileMenuOpen(false);

    if (!item.url.startsWith("/#")) return;

    if (pathname !== "/") {
      window.location.assign(item.url);
      return;
    }

    event?.preventDefault();
    const targetId = item.url.replace("/#", "");

    const scrollToTarget = () => {
      const scrolled = scrollToSection(targetId, "smooth");
      if (!scrolled) return false;

      const currentUrl = `${window.location.pathname}${window.location.hash}`;
      if (currentUrl !== item.url) {
        window.history.pushState({ section: targetId }, "", item.url);
      } else {
        window.history.replaceState({ section: targetId }, "", item.url);
      }
      return scrolled;
    };

    window.requestAnimationFrame(() => {
      if (scrollToTarget()) return;
      window.requestAnimationFrame(() => {
        scrollToTarget();
      });
    });
  };

  return (
    <div className={cn("fixed left-0 right-0 top-6 z-[9999] px-4", className)}>
      <div className="flex items-center justify-between pt-6 md:hidden">
        <div className="[&_button]:h-10 [&_button]:w-10 [&_button]:rounded-full [&_button]:border-border/60 [&_button]:bg-background/70 dark:[&_button]:border-white/20 dark:[&_button]:bg-black/60">
          <ThemeToggle />
        </div>

        <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              aria-label="Open navigation menu"
              className="rounded-full border-border/60 bg-background/75 shadow-lg backdrop-blur-xl dark:border-white/20 dark:bg-black/60"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="top"
            className="border-b border-border/70 bg-background/95 px-4 pb-4 pt-14 backdrop-blur-xl"
          >
            <nav className="grid gap-2">
              {items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.name;

                return (
                  <Link
                    key={`mobile-${item.name}`}
                    href={item.url}
                    onClick={(event) => handleNavItemClick(item, event)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors",
                      isActive
                        ? "border-primary/45 bg-primary/10 text-foreground"
                        : "border-border/70 bg-card/70 text-foreground/85 hover:border-primary/35 hover:text-foreground"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden justify-center pt-6 md:flex">
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
                onClick={(event) => handleNavItemClick(item, event)}
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
