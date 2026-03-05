"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { cn } from "@/src/lib/utils";

type ScrollSection = {
  id: string;
  label: string;
};

export function ScrollStatus({ sections }: { sections: ScrollSection[] }) {
  const [progress, setProgress] = useState(0);
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "");

  const sectionIds = useMemo(() => sections.map((section) => section.id), [sections]);

  useEffect(() => {
    if (!sectionIds.length) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
      setProgress(nextProgress);

      const checkpoint = window.innerHeight * 0.35;
      let currentId = sectionIds[0];

      for (const id of sectionIds) {
        const element = document.getElementById(id);
        if (!element) continue;
        const rect = element.getBoundingClientRect();
        if (rect.top <= checkpoint) {
          currentId = id;
        }
      }

      setActiveId(currentId);
    };

    const requestUpdate = () => {
      if (raf) return;
      raf = window.requestAnimationFrame(() => {
        update();
        raf = 0;
      });
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    window.addEventListener("hashchange", requestUpdate);

    return () => {
      if (raf) window.cancelAnimationFrame(raf);
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      window.removeEventListener("hashchange", requestUpdate);
    };
  }, [sectionIds]);

  return (
    <aside className="fixed top-1/2 right-6 z-[120] flex -translate-y-1/2 items-center gap-3 rounded-2xl border-2 border-[#2563eb] bg-[#dbeafe] px-3 py-3 shadow-lg dark:border-[#60a5fa] dark:bg-[#0f172a]">
      <span className="text-[10px] font-bold tracking-[0.16em] text-[#1d4ed8] dark:text-[#93c5fd]">
        SCROLL
      </span>

      <div className="relative h-36 w-2.5 overflow-hidden rounded-full bg-[#93c5fd] dark:bg-[#1e3a8a]">
        <div
          className="absolute inset-x-0 bottom-0 rounded-full bg-[#1d4ed8] transition-all duration-200"
          style={{ height: `${Math.max(6, Math.round(progress * 100))}%` }}
        />
      </div>

      <span className="w-9 text-[11px] font-bold text-[#1d4ed8] dark:text-[#93c5fd]">
        {Math.round(progress * 100)}%
      </span>

      <nav className="flex flex-col gap-2">
        {sections.map((section) => (
          <Link
            key={section.id}
            href={`/#${section.id}`}
            aria-label={`Go to ${section.label}`}
            className={cn(
              "size-3 rounded-full border border-[#60a5fa] bg-[#bfdbfe] transition-all duration-200 hover:scale-110 dark:border-[#60a5fa] dark:bg-[#1d4ed8]",
              activeId === section.id &&
                "size-4 border-[#1e40af] bg-[#1d4ed8] shadow-[0_0_0_2px_rgba(37,99,235,0.28)]"
            )}
          />
        ))}
      </nav>
    </aside>
  );
}
