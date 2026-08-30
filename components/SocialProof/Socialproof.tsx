"use client";
import "./SocialProof.css";
import Reveal from "@/components/Reveal/Reveal";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const SocialProof = () => {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      if (!imgWrapRef.current || !imgRef.current) return;

      gsap.set(imgRef.current, { scale: 1.2 });

      ScrollTrigger.create({
        trigger: imgWrapRef.current,
        start: "top 85%",
        once: true,
        onEnter: () => {
          gsap.to(imgRef.current, {
            scale: 1,
            duration: 1.4,
            ease: "power3.out",
          });
        },
      });
    },
    { scope: imgWrapRef },
  );

  return (
    <section id='proof' className='social-proof'>
      <div className='container social-proof-inner'>
        <div className='social-proof-img' ref={imgWrapRef}>
          <img
            ref={imgRef}
            src='/assets/about-cta-window.jpg'
            alt='Heaven Furniture Mart showroom'
          />
        </div>

        <div className='social-proof-copy'>
          <Reveal>
            <span className='social-proof-mark'>&ldquo;</span>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className='social-proof-quote'>
              Furniture is more than just function; it is a reflection of
              lifestyle, taste, and comfort. Every piece we create is designed
              to bring lasting elegance into the homes of our clients.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <div className='social-proof-attribution'>
              <p className='social-proof-name'>Abul Kalam Bhuiyan</p>
              <p className='social-proof-title'>
                Managing Director, Heaven Furniture Mart
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.3}>
            <p className='social-proof-stat eyebrow'>
              Trusted by hundreds of happy homeowners across Chattogram
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
