"use client";

import { useEffect, useMemo, useState } from "react";

type ScrollSection = {
  id: string;
};

export function ScrollStatus({ sections }: { sections: ScrollSection[] }) {
  const [progress, setProgress] = useState(0);
  const sectionIds = useMemo(
    () => sections.map((section) => section.id),
    [sections]
  );

  useEffect(() => {
    if (!sectionIds.length) return;

    let raf = 0;
    const update = () => {
      const scrollTop = window.scrollY;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = scrollable > 0 ? Math.min(scrollTop / scrollable, 1) : 0;
      setProgress(nextProgress);
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
    <aside className="fixed top-16 right-3 bottom-6 z-[80] w-1.5 rounded-full bg-border/70">
      <div className="h-full w-full overflow-hidden rounded-full">
        <div
          className="w-full rounded-full bg-primary transition-all duration-200"
          style={{ height: `${Math.max(4, Math.round(progress * 100))}%` }}
        />
      </div>
    </aside>
  );
}
