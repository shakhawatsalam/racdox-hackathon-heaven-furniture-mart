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
};

const COLLECTIONS: Collection[] = [
  {
    name: "Living Room",
    detail: "Sofas · Coffee tables · TV units · Consoles",
    image: "/assets/about-cta-window.jpg",
  },
  {
    name: "Bedroom",
    detail: "Beds · Wardrobes · Dressing tables · Bedside tables",
    image: "/assets/about-cta-window.jpg",
  },
  {
    name: "Dining",
    detail: "Dining tables · Dining chairs · Cabinets",
    image: "/assets/about-cta-window.jpg",
  },
  {
    name: "Bespoke",
    detail: "Built to your own space, size, and taste",
    image: "/assets/about-cta-window.jpg",
  },
];

const CollectionCard = ({ collection }: { collection: Collection }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!cardRef.current || !imgRef.current) return;

      gsap.fromTo(
        imgRef.current,
        { y: "-12%" },
        {
          y: "12%",
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: cardRef },
  );

  return (
    <div className='collection-card' ref={cardRef}>
      <div className='collection-card-img'>
        <img ref={imgRef} src={collection.image} alt={collection.name} />
      </div>
      <div className='collection-card-info'>
        <h3>{collection.name}</h3>
        <p>{collection.detail}</p>
      </div>
    </div>
  );
};

const CollectionsSnapshot = () => {
  return (
    <section id='collections' className='collections'>
      <div className='container'>
        <Reveal>
          <p className='eyebrow collections-eyebrow'>What we build</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className='collections-heading'>A few of our collections</h2>
        </Reveal>

        <div className='collections-grid'>
          {COLLECTIONS.map((collection) => (
            <CollectionCard key={collection.name} collection={collection} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CollectionsSnapshot;
