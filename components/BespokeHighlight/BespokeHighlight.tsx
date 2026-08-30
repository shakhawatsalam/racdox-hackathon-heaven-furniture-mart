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
    image: "/assets/about-cta-window.jpg",
  },
  {
    label: "Stage 02",
    title: "Framing",
    description:
      "The frame takes shape. Precise joinery holds every proportion true to the original design.",
    image: "/assets/about-cta-window.jpg",
  },
  {
    label: "Stage 03",
    title: "Finishing",
    description:
      "Upholstery, polish, and stain bring texture, tone, and the final character to the piece.",
    image: "/assets/about-cta-window.jpg",
  },
  {
    label: "Stage 04",
    title: "Delivered & Installed",
    description:
      "The finished piece arrives at your home, installed and ready to be lived with.",
    image: "/assets/about-cta-window.jpg",
  },
];

const BespokeHighlight = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);
  const [activeStage, setActiveStage] = useState(0);
  const activeStageRef = useRef(0);

  useGSAP(
    () => {
      if (!sectionRef.current) return;
      if (window.innerWidth <= 1000) return;

      gsap.set(imageRefs.current, { opacity: 0 });
      gsap.set(imageRefs.current[0], { opacity: 1 });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: `+=${window.innerHeight * (STAGES.length - 1) * 1.2}px`,
        pin: true,
        pinSpacing: true,
        scrub: 0.6,
        onUpdate: (self) => {
          const progress = self.progress;
          const rawIndex = progress * (STAGES.length - 1);
          const index = Math.min(STAGES.length - 1, Math.round(rawIndex));

          if (index !== activeStageRef.current) {
            gsap.to(imageRefs.current[activeStageRef.current], {
              opacity: 0,
              duration: 0.4,
              ease: "power2.out",
            });
            gsap.to(imageRefs.current[index], {
              opacity: 1,
              duration: 0.4,
              ease: "power2.out",
            });
            activeStageRef.current = index;
            setActiveStage(index);
          }
        },
      });
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
            <h3>{STAGES[activeStage].title}</h3>
            <p className='lg'>{STAGES[activeStage].description}</p>
          </div>
        </div>

        <div className='bespoke-col bespoke-visual'>
          <div className='bespoke-visual-frame'>
            {STAGES.map((stage, index) => (
              <img
                key={stage.label}
                ref={(el) => {
                  imageRefs.current[index] = el;
                }}
                src={stage.image}
                alt={stage.title}
                className='bespoke-stage-img'
              />
            ))}
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
