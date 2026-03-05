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
          value: 120,
          density: {
            enable: true,
            width: 1280,
            height: 720,
          },
        },
        color: {
          value: isDark ? "#e2e8f0" : "#334155",
        },
        opacity: {
          value: { min: isDark ? 0.2 : 0.1, max: isDark ? 0.9 : 0.45 },
          animation: {
            enable: true,
            speed: 0.8,
            sync: false,
          },
        },
        size: {
          value: { min: 1, max: 3.2 },
        },
        move: {
          enable: true,
          speed: 0.35,
          direction: "none",
          outModes: {
            default: "out",
          },
        },
        shape: {
          type: "circle",
        },
      },
      interactivity: {
        events: {
          onHover: { enable: false, mode: [] },
          onClick: { enable: false, mode: [] },
          resize: { enable: true },
        },
      },
    }),
    [isDark]
  );

  if (!ready) return null;

  return (
    <Particles
      id="stars-background"
      className="pointer-events-none"
      options={options}
    />
  );
}
