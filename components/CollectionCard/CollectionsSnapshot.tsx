"use client";
import "./CollectionsSnapshot.css";
import Reveal from "@/components/Reveal/Reveal";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

type Collection = {
  name: string;
  detail: string;
  image: string;
  backImg: string;
};

const COLLECTIONS: Collection[] = [
  {
    name: "Living Room",
    detail: "Sofas · Coffee tables · TV units · Consoles",
    image: "/assets/logohaven.jpg",
    backImg: "/assets/image01b.png",
  },
  {
    name: "Bedroom",
    detail: "Beds · Wardrobes · Dressing tables · Bedside tables",
    image: "/assets/logohaven.jpg",
    backImg: "/assets/image02b.png",
  },
  {
    name: "Dining",
    detail: "Dining tables · Dining chairs · Cabinets",
    image: "/assets/logohaven.jpg",
    backImg: "/assets/image03b.png",
  },
  {
    name: "Bespoke",
    detail: "Built to your own space, size, and taste",
    image: "/assets/logohaven.jpg",
    backImg: "/assets/image04b.png",
  },
];

const POSITIONS = [14, 38, 62, 86];
const ROTATIONS = [-15, -7.5, 7.5, 15];

const CollectionsSnapshot = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useGSAP(
    () => {
      if (!containerRef.current) return;
      if (window.innerWidth <= 1000) return;

      const cardsSection =
        containerRef.current.querySelector(".collections-cards");
      if (!cardsSection) return;

      const cards = cardRefs.current;
      const totalScrollHeight = window.innerHeight * 3;

      // Pin the fan/flip stage for 3 viewport-heights of scroll.
      ScrollTrigger.create({
        trigger: cardsSection,
        start: "top top",
        end: () => `+=${totalScrollHeight}`,
        pin: true,
        pinSpacing: true,
      });

      // Phase 1 (first third): spread the stacked cards outward.
      cards.forEach((card, index) => {
        if (!card) return;
        gsap.to(card, {
          left: `${POSITIONS[index]}%`,
          rotation: ROTATIONS[index],
          ease: "none",
          scrollTrigger: {
            trigger: cardsSection,
            start: "top top",
            end: () => `+=${window.innerHeight}`,
            scrub: 0.5,
          },
        });
      });

      // Phase 2 (staggered middle window): flip each card, un-rotate, re-center.
      cards.forEach((card, index) => {
        if (!card) return;
        const frontEl = card.querySelector<HTMLElement>(".flip-card-front");
        const backEl = card.querySelector<HTMLElement>(".flip-card-back");
        if (!frontEl || !backEl) return;

        const staggerOffset = index * 0.05;
        const startOffset = 1 / 3 + staggerOffset;
        const endOffset = 2 / 3 + staggerOffset;

        ScrollTrigger.create({
          trigger: cardsSection,
          start: "top top",
          end: () => `+=${totalScrollHeight}`,
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            if (progress >= startOffset && progress <= endOffset) {
              const animationProgress = (progress - startOffset) / (1 / 3);
              const frontRotation = -180 * animationProgress;
              const backRotation = 180 - 180 * animationProgress;
              const cardRotation = ROTATIONS[index] * (1 - animationProgress);

              gsap.to(frontEl, { rotateY: frontRotation, ease: "power1.out" });
              gsap.to(backEl, { rotateY: backRotation, ease: "power1.out" });
              gsap.to(card, {
                xPercent: -50,
                yPercent: -50,
                rotate: cardRotation,
                ease: "power1.out",
              });
            }
          },
        });
      });
    },
    { scope: containerRef },
  );

  return (
    <section id='collections' className='collections' ref={containerRef}>
      <div className='collections-cards'>
        <div className='container collections-header'>
          <Reveal>
            <p className='eyebrow collections-eyebrow'>What we build</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className='collections-heading'>A few of our collections</h2>
          </Reveal>
        </div>

        {COLLECTIONS.map((collection, index) => (
          <div
            className='collection-fan-card'
            key={collection.name}
            ref={(el) => {
              cardRefs.current[index] = el;
            }}>
            <div className='collection-fan-card-wrapper'>
              <div className='flip-card-inner'>
                <div className='flip-card-front'>
                  <img src={collection.image} alt={collection.name} />
                </div>
                <div className='flip-card-back'>
                  <img
                    src={collection.backImg}
                    alt={collection.name}
                    className='flip-card-back-img'
                  />
                  {/* <div className='flip-card-back-overlay' />
                  <div className='flip-card-back-text'>
                    <h3>{collection.name}</h3>
                    <p>{collection.detail}</p>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className='collections-mobile container'>
        <div className='collections-header collections-header-mobile'>
          <p className='eyebrow collections-eyebrow'>What we build</p>
          <h2 className='collections-heading'>A few of our collections</h2>
        </div>
        {COLLECTIONS.map((collection) => (
          <Reveal key={collection.name}>
            <div className='collection-mobile-card'>
              <div className='collection-mobile-img'>
                <img src={collection.backImg} alt={collection.name} />
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default CollectionsSnapshot;
