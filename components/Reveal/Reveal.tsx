"use client";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  as?: "div" | "span";
};

const Reveal = ({ children, delay = 0, y = 32, as = "div" }: RevealProps) => {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!ref.current) return;

      if (window.matchMedia("(max-width: 1000px)").matches) return;

      gsap.set(ref.current, { opacity: 0, y });

      ScrollTrigger.create({
        trigger: ref.current,
        start: "top 88%",
        once: true,
        onEnter: () => {
          gsap.to(ref.current, {
            opacity: 1,
            y: 0,
            duration: 1,
            delay,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: ref },
  );

  const Tag = as;
  return <Tag ref={ref}>{children}</Tag>;
};

export default Reveal;
