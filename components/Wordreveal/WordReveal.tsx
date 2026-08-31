"use client";
import "./WordReveal.css";
import { ElementType, Fragment, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type WordRevealProps = {
  text: string;
  as?: ElementType;
  className?: string;
  start?: string;
  end?: string;
  dimOpacity?: number;
  markers?: boolean;
};

const WordReveal = ({
  text,
  as: Tag = "p",
  className,
  start = "top 80%",
  end = "bottom 40%",
  dimOpacity = 0.18,
  markers = false,
}: WordRevealProps) => {
  const containerRef = useRef<HTMLElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      if (!containerRef.current) return;

      const wordEls =
        containerRef.current.querySelectorAll<HTMLElement>(".word-reveal-word");
      gsap.set(wordEls, { opacity: dimOpacity });

      const total = wordEls.length;

      const trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start,
        end,
        markers,
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;

          wordEls.forEach((word, index) => {
            const wordProgress = index / total;
            const nextWordProgress = (index + 1) / total;

            let opacity = dimOpacity;

            if (progress >= nextWordProgress) {
              opacity = 1;
            } else if (progress >= wordProgress) {
              const fade =
                (progress - wordProgress) / (nextWordProgress - wordProgress);
              opacity = dimOpacity + fade * (1 - dimOpacity);
            }

            gsap.set(word, { opacity });
          });
        },
      });

      return () => trigger.kill();
    },
    { scope: containerRef, dependencies: [text, start, end, dimOpacity] },
  );

  return (
    // @ts-expect-error — Tag is a dynamic element type
    <Tag ref={containerRef} className={className}>
      {words.map((word, index) => (
        <Fragment key={index}>
          <span className='word-reveal-word'>{word}</span>
          {index < words.length - 1 ? " " : ""}
        </Fragment>
      ))}
    </Tag>
  );
};

export default WordReveal;
