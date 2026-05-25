"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/src/hooks/use-has-mounted";

export function AnimatedBackground() {
  const [ready, setReady] = useState(false);
  const mounted = useHasMounted();
  const { resolvedTheme } = useTheme();
  const isDark = !mounted || resolvedTheme === "dark";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: { enable: true, zIndex: 0 },
      background: { color: { value: "transparent" } },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: 115,
          density: { enable: true, width: 1280, height: 720 },
        },
        color: {
          value: isDark ? ["#f8fafc", "#fbbf24", "#fb923c"] : ["#334155"],
        },
        opacity: {
          value: { min: 0.35, max: 1 },
          animation: { enable: true, speed: 1, sync: false },
        },
        size: {
          value: { min: 1.4, max: 3.8 },
          animation: { enable: true, speed: 2.2, sync: false },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: { default: "out" },
        },
        shape: { type: "circle" },
        links: {
          enable: true,
          distance: 118,
          opacity: 0.16,
          color: isDark ? "#f59e0b" : "#0f172a",
          width: 1.15,
        },
      },
      interactivity: {
        detectsOn: "window",
        events: {
          onHover: { enable: true, mode: ["grab", "bubble"] },
          onClick: { enable: true, mode: ["push"] },
          resize: { enable: true },
        },
        modes: {
          grab: { distance: 205, links: { opacity: 0.58 } },
          bubble: { distance: 165, size: 6.4, duration: 1.5, opacity: 1 },
          push: { quantity: 3 },
        },
      },
    }),
    [isDark]
  );

  if (!ready) return null;

  return (
    <Particles
      id="stars-background"
      className="pointer-events-none opacity-95 dark:opacity-100"
      options={options}
    />
  );
}
