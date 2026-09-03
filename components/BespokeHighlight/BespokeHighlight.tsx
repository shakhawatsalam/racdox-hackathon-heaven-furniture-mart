"use client";
import "./BespokeHighlight.css";
import Reveal from "@/components/Reveal/Reveal";

import { useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Stage = {
  label: string;
  title: string;
  description: string;
  image: string;
};

const STAGES: Stage[] = [
  {
    label: "Stage 01",
    title: "Raw Materials",
    description:
      "Every piece begins with premium wood, selected and prepared by hand before a single cut is made.",
    image: "/assets/step1v2.webp",
  },
  {
    label: "Stage 02",
    title: "Framing",
    description:
      "The frame takes shape. Precise joinery holds every proportion true to the original design.",
    image: "/assets/step2v2.webp",
  },
  {
    label: "Stage 03",
    title: "Finishing",
    description:
      "Upholstery, polish, and stain bring texture, tone, and the final character to the piece.",
    image: "/assets/step3v2.webp",
  },
  {
    label: "Stage 04",
    title: "Delivered & Installed",
    description:
      "The finished piece arrives at your home, installed and ready to be lived with.",
    image: "/assets/step4v2.webp",
  },
];

const STRIPS_COUNT = 16;
const TITLE_CHANGE_THRESHOLD = 0.5;

// Precomputed clip-path bounds for each strip (top-to-bottom band positions).
const STRIP_BOUNDS = Array.from({ length: STRIPS_COUNT }, (_, stripIndex) => {
  const posFromBottom = STRIPS_COUNT - stripIndex - 1;
  const lower = (posFromBottom + 1) * (100 / STRIPS_COUNT);
  const upper = posFromBottom * (100 / STRIPS_COUNT);
  return { lower, upper: upper - 0.1 };
});

function closedClip(lower: number) {
  return `polygon(0% ${lower}%, 100% ${lower}%, 100% ${lower}%, 0% ${lower}%)`;
}

function openClip(lower: number, upper: number) {
  return `polygon(0% ${lower}%, 100% ${lower}%, 100% ${upper}%, 0% ${upper}%)`;
}

function scaleForStage(
  stageIndex: number,
  currentIndex: number,
  localProgress: number,
) {
  if (stageIndex > currentIndex) return 1.15;
  if (stageIndex < currentIndex) return 1;
  return 1.15 - 0.15 * localProgress;
}

const BespokeHighlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const baseImgRef = useRef<HTMLImageElement>(null);
  const overlayImgRefs = useRef<(HTMLImageElement[] | null)[]>(
    STAGES.map(() => null),
  );
  const stripRefs = useRef<(HTMLDivElement[] | null)[]>(STAGES.map(() => null));

  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);

  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);
  const isAnimatingText = useRef(false);
  const queuedIndex = useRef<number | null>(null);

  const animateTextChange = (index: number, direction: "down" | "up") => {
    if (index === activeStageRef.current) return;

    if (isAnimatingText.current) {
      queuedIndex.current = index;
      return;
    }

    isAnimatingText.current = true;
    const outY = direction === "down" ? "-120%" : "120%";
    const inY = direction === "down" ? "120%" : "-120%";
    const targets = [titleRef.current, descRef.current].filter(
      Boolean,
    ) as HTMLElement[];

    gsap.killTweensOf(targets);

    gsap.to(targets, {
      y: outY,
      duration: 0.45,
      ease: "power3.out",
      onComplete: () => {
        if (titleRef.current)
          titleRef.current.textContent = STAGES[index].title;
        if (descRef.current)
          descRef.current.textContent = STAGES[index].description;

        gsap.set(targets, { y: inY });

        gsap.to(targets, {
          y: "0%",
          duration: 0.45,
          ease: "power3.out",
          onComplete: () => {
            activeStageRef.current = index;
            setActiveStage(index);
            isAnimatingText.current = false;

            if (
              queuedIndex.current !== null &&
              queuedIndex.current !== activeStageRef.current
            ) {
              const next = queuedIndex.current;
              queuedIndex.current = null;
              animateTextChange(next, direction);
            }
          },
        });
      },
    });
  };

  useGSAP(
    () => {
      if (!sectionRef.current) return;

      const media = gsap.matchMedia();

      media.add("(min-width: 1001px)", () => {
        const transitionCount = STAGES.length - 1;

        // Every overlay stage's strips start fully closed.
        stripRefs.current.forEach((strips) => {
          if (!strips) return;
          strips.forEach((strip, stripIndex) => {
            gsap.set(strip, {
              clipPath: closedClip(STRIP_BOUNDS[stripIndex].lower),
            });
          });
        });

        let lastImageProgress = 0;

        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: `+=${window.innerHeight * transitionCount * 1.3}px`,
          pin: true,
          pinSpacing: true,
          scrub: 0.6,
          onUpdate: (self) => {
            const raw = self.progress * transitionCount;
            const currentIndex = Math.min(Math.floor(raw), transitionCount - 1);
            const localProgress = Math.min(1, raw - currentIndex);
            const direction = raw > lastImageProgress ? "down" : "up";
            lastImageProgress = raw;

            // Base image (stage 0) scale settle.
            if (baseImgRef.current) {
              baseImgRef.current.style.transform = `scale(${scaleForStage(
                0,
                currentIndex,
                localProgress,
              )})`;
            }

            // Overlay stages (1..N-1), each revealed via its own transition.
            for (let i = 1; i < STAGES.length; i++) {
              const transitionIndex = i - 1;
              const strips = stripRefs.current[i];
              const overlayImgs = overlayImgRefs.current[i];
              if (!strips || !overlayImgs) continue;

              const scale = scaleForStage(i, currentIndex, localProgress);
              overlayImgs.forEach((img) => {
                img.style.transform = `scale(${scale})`;
              });

              if (transitionIndex < currentIndex) {
                strips.forEach((strip, stripIndex) => {
                  const { lower, upper } = STRIP_BOUNDS[stripIndex];
                  strip.style.clipPath = openClip(lower, upper);
                });
              } else if (transitionIndex === currentIndex) {
                strips.forEach((strip, stripIndex) => {
                  const { lower, upper } = STRIP_BOUNDS[stripIndex];
                  const stripDelay = (stripIndex / STRIPS_COUNT) * 0.5;
                  const adjusted = Math.max(
                    0,
                    Math.min(1, (localProgress - stripDelay) * 2),
                  );
                  const currentUpper = lower - (lower - upper) * adjusted;
                  strip.style.clipPath = openClip(lower, currentUpper);
                });
              } else {
                strips.forEach((strip, stripIndex) => {
                  strip.style.clipPath = closedClip(
                    STRIP_BOUNDS[stripIndex].lower,
                  );
                });
              }
            }

            // Title/description swap — threshold-based, direction-aware.
            const targetIndex =
              localProgress >= TITLE_CHANGE_THRESHOLD
                ? Math.min(currentIndex + 1, STAGES.length - 1)
                : currentIndex;

            if (targetIndex !== activeStageRef.current) {
              queuedIndex.current = targetIndex;
              if (!isAnimatingText.current) {
                animateTextChange(targetIndex, direction);
              }
            }
          },
        });
      });

      return () => media.revert();
    },
    { scope: sectionRef },
  );

  return (
    <section id='bespoke' className='bespoke-highlight' ref={sectionRef}>
      <div className='container bespoke-inner'>
        <div className='bespoke-col bespoke-text'>
          <p className='eyebrow bespoke-eyebrow'>Our #1 difference</p>
          <h2 className='bespoke-heading'>Designed. Crafted. Customized.</h2>

          <div className='bespoke-track'>
            {STAGES.map((stage, index) => (
              <div
                key={stage.label}
                className={`bespoke-track-item ${
                  index === activeStage ? "active" : ""
                }`}>
                <span className='bespoke-track-label'>{stage.label}</span>
                <div className='bespoke-track-line' />
              </div>
            ))}
          </div>

          <div className='bespoke-stage-copy'>
            <div className='bespoke-stage-copy-mask'>
              <h3 ref={titleRef}>{STAGES[0].title}</h3>
            </div>
            <div className='bespoke-stage-copy-mask bespoke-stage-copy-mask-desc'>
              <p className='lg' ref={descRef}>
                {STAGES[0].description}
              </p>
            </div>
          </div>
        </div>

        <div className='bespoke-col bespoke-visual'>
          <div className='bespoke-visual-frame'>
            <img
              ref={baseImgRef}
              src={STAGES[0].image}
              alt={STAGES[0].title}
              className='bespoke-stage-img bespoke-base-img'
            />

            {STAGES.map((stage, index) => {
              if (index === 0) return null;
              return (
                <div
                  key={stage.label}
                  className='bespoke-strip-container'
                  ref={(el) => {
                    if (el) {
                      stripRefs.current[index] = Array.from(
                        el.querySelectorAll<HTMLDivElement>(".bespoke-strip"),
                      );
                      overlayImgRefs.current[index] = Array.from(
                        el.querySelectorAll<HTMLImageElement>("img"),
                      );
                    }
                  }}>
                  {Array.from({ length: STRIPS_COUNT }).map((_, stripIndex) => (
                    <div className='bespoke-strip' key={stripIndex}>
                      <img src={stage.image} alt={stage.title} />
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className='bespoke-mobile container'>
        <p className='eyebrow bespoke-eyebrow'>Our #1 difference</p>
        <h2 className='bespoke-heading'>Designed. Crafted. Customized.</h2>
        {STAGES.map((stage) => (
          <Reveal key={stage.label}>
            <div className='bespoke-mobile-card'>
              <div className='bespoke-mobile-img'>
                <img src={stage.image} alt={stage.title} />
              </div>
              <span className='bespoke-track-label'>{stage.label}</span>
              <h3>{stage.title}</h3>
              <p className='lg'>{stage.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default BespokeHighlight;
