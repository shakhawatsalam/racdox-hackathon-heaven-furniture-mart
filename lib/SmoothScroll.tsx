"use client";
import { ReactNode, useEffect } from "react";
import Lenis from "lenis";

const SmoothScroll = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const isMobile = window.innerWidth <= 1000;

    if (isMobile) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    let frameId: number;

    function raf(time: number) {
      lenis.raf(time);
      frameId = requestAnimationFrame(raf);
    }

    frameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
