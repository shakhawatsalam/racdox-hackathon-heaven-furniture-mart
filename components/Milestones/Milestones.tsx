"use client";
import "./Milestones.css";
import Reveal from "@/components/Reveal/Reveal";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Milestone = {
  year: string;
  title: string;
  description: string;
};

const MILESTONES: Milestone[] = [
  {
    year: "2020",
    title: "Founded",
    description: "Founded by Abul Kalam Bhuiyan.",
  },
  {
    year: "2021",
    title: "Agrabad Showroom",
    description: "Opened the Agrabad showroom in Chattogram.",
  },
  {
    year: "2024–25",
    title: "International Furniture Fair",
    description: "Exhibited at the Int'l Furniture Fair, Chattogram.",
  },
  {
    year: "2025",
    title: "Chamber Membership",
    description: "Became a member of the Chamber of Commerce.",
  },
  {
    year: "2026",
    title: "BFIOA Recognition",
    description: "Received nationwide BFIOA recognition.",
  },
];

const Milestones = () => {
  const lineRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!lineRef.current) return;

    gsap.set(lineRef.current, { scaleX: 0 });

    ScrollTrigger.create({
      trigger: lineRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(lineRef.current, {
          scaleX: 1,
          duration: 1.4,
          ease: "power3.inOut",
        });
      },
    });
  }, []);

  return (
    <section id='milestones' className='milestones'>
      <div className='container'>
        <div className='milestones-header'>
          <Reveal>
            <p className='eyebrow milestones-eyebrow'>Our Journey</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className='milestones-heading'>
              A few milestones along the way.
            </h2>
          </Reveal>
        </div>

        <div className='milestones-timeline'>
          <div className='milestones-line' ref={lineRef} />
          {MILESTONES.map((milestone, index) => (
            <Reveal key={milestone.year} delay={index * 0.08}>
              <div className='milestone-item'>
                <span className='milestone-dot' />
                <p className='milestone-year'>{milestone.year}</p>
                <h3>{milestone.title}</h3>
                <p className='milestone-desc'>{milestone.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Milestones;
