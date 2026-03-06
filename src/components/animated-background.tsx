"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";
import { useTheme } from "next-themes";

export function AnimatedBackground() {
  const [ready, setReady] = useState(false);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => setReady(true));
  }, []);

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      background: {
        color: { value: "transparent" },
      },
      fpsLimit: 60,
      detectRetina: true,
      particles: {
        number: {
          value: isDark ? 115 : 95,
          density: {
            enable: true,
            width: 1280,
            height: 720,
          },
        },
        color: {
          value: isDark ? ["#f8fafc", "#fbbf24", "#fb923c"] : "#334155",
        },
        opacity: {
          value: { min: isDark ? 0.35 : 0.1, max: isDark ? 1 : 0.45 },
          animation: {
            enable: true,
            speed: isDark ? 1 : 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: isDark ? 1.4 : 1, max: isDark ? 3.8 : 3.2 },
          animation: {
            enable: true,
            speed: 2.2,
            sync: false,
          },
        },
        move: {
          enable: true,
          speed: 0.5,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
        shape: {
          type: "circle",
        },
        links: {
          enable: true,
          distance: isDark ? 118 : 100,
          opacity: isDark ? 0.16 : 0.12,
          color: isDark ? "#f59e0b" : "#0f172a",
          width: isDark ? 1.15 : 1,
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
          grab: {
            distance: isDark ? 205 : 170,
            links: {
              opacity: isDark ? 0.58 : 0.3,
            },
          },
          bubble: {
            distance: isDark ? 165 : 125,
            size: isDark ? 6.4 : 4.6,
            duration: 1.5,
            opacity: isDark ? 1 : 0.75,
          },
          push: {
            quantity: isDark ? 3 : 2,
          },
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
