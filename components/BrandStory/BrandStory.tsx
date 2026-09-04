"use client";
import "./BrandStory.css";
import Reveal from "@/components/Reveal/Reveal";
import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const OPEN_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLOSED_CLIP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const BrandStory = () => {
  const stickyRef = useRef<HTMLDivElement>(null);

  const col1Ref = useRef<HTMLDivElement>(null);
  const col2Ref = useRef<HTMLDivElement>(null);
  const col3Ref = useRef<HTMLDivElement>(null);
  const col4Ref = useRef<HTMLDivElement>(null);

  const img1Ref = useRef<HTMLImageElement>(null);
  const img2WrapRef = useRef<HTMLDivElement>(null);
  const img2Ref = useRef<HTMLImageElement>(null);

  const textLineRef = useRef<HTMLSpanElement>(null);
  const textLine2Ref = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      if (!stickyRef.current) return;
      if (window.innerWidth <= 1000) return;

      gsap.set(textLineRef.current, { y: "0%" });
      gsap.set(textLine2Ref.current, { y: "-125%" });

      let currentPhase = 0;

      ScrollTrigger.create({
        trigger: stickyRef.current,
        start: "top top",
        end: () => `+=${window.innerHeight * 6}`,
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const progress = self.progress;

          if (progress >= 0.3 && currentPhase === 0) {
            currentPhase = 1;

            gsap.to(col1Ref.current, {
              opacity: 0,
              scale: 0.75,
              duration: 0.75,
            });
            gsap.to(col2Ref.current, { x: "0%", duration: 0.75 });
            gsap.to(col3Ref.current, { y: "0%", duration: 0.75 });

            gsap.to(img1Ref.current, { scale: 1.25, duration: 0.75 });
            gsap.to(img2WrapRef.current, {
              clipPath: OPEN_CLIP,
              duration: 0.75,
            });
            gsap.to(img2Ref.current, { scale: 1, duration: 0.75 });
          }

          if (progress >= 0.6 && currentPhase === 1) {
            currentPhase = 2;

            gsap.to(col2Ref.current, {
              opacity: 0,
              scale: 0.75,
              duration: 0.75,
            });
            gsap.to(col3Ref.current, { x: "0%", duration: 0.75 });
            gsap.to(col4Ref.current, { y: "0%", duration: 0.75 });

            gsap.to(textLineRef.current, { y: "-125%", duration: 0.75 });
            gsap.to(textLine2Ref.current, {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            });
          }

          if (progress < 0.3 && currentPhase >= 1) {
            currentPhase = 0;

            gsap.to(col1Ref.current, { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to(col2Ref.current, { x: "100%", duration: 0.75 });
            gsap.to(col3Ref.current, { y: "100%", duration: 0.75 });

            gsap.to(img1Ref.current, { scale: 1, duration: 0.75 });
            gsap.to(img2WrapRef.current, {
              clipPath: CLOSED_CLIP,
              duration: 0.75,
            });
            gsap.to(img2Ref.current, { scale: 1.25, duration: 0.75 });
          }

          if (progress < 0.6 && currentPhase === 2) {
            currentPhase = 1;

            gsap.to(col2Ref.current, { opacity: 1, scale: 1, duration: 0.75 });
            gsap.to(col3Ref.current, { x: "100%", duration: 0.75 });
            gsap.to(col4Ref.current, { y: "100%", duration: 0.75 });

            gsap.to(textLineRef.current, {
              y: "0%",
              duration: 0.75,
              delay: 0.5,
            });
            gsap.to(textLine2Ref.current, { y: "-125%", duration: 0.75 });
          }
        },
      });
    },
    { scope: stickyRef },
  );

  return (
    <>
      <div className='story-header'>
        <div className='container'>
          <Reveal>
            <p className='eyebrow story-eyebrow'>Our Approach</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className='story-heading'>
              Furniture shaped around <span>how you live</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='lg story-subheading'>
              From first sketch to final finish, every piece we build reflects
              comfort, craft, and quiet intention.
            </p>
          </Reveal>
        </div>
      </div>

      <section className='sticky-cols' ref={stickyRef}>
        <div className='sticky-cols-wrapper'>
          <div className='story-col story-col-1' ref={col1Ref}>
            <div className='story-col-content'>
              <div className='story-col-content-wrapper'>
                <h2>
                  We design pieces where <span>comfort meets</span> quiet
                  craftsmanship.
                </h2>
                <p>
                  Grain, texture, and proportion come together to create
                  furniture that feels considered, not mass-produced.
                </p>
              </div>
            </div>
          </div>

          <div className='story-col story-col-2' ref={col2Ref}>
            <div className='story-col-img story-col-img-1'>
              <div className='story-col-img-wrapper'>
                <img ref={img1Ref} src='/assets/heavenImage01.png' alt='' />
              </div>
            </div>
            <div className='story-col-img story-col-img-2' ref={img2WrapRef}>
              <div className='story-col-img-wrapper'>
                <img ref={img2Ref} src='/assets/heavenImage02.png' alt='' />
              </div>
            </div>
          </div>

          <div className='story-col story-col-3' ref={col3Ref}>
            <div className='story-col-content-wrapper'>
              <div className='story-line-mask'>
                <div className='story-line' ref={textLineRef}>
                  <h2>
                    Every piece is crafted to feel <span>as considered as</span>{" "}
                    it looks.
                  </h2>
                  <p>
                    We balance warmth and precision, so each piece earns its
                    place in your home rather than just filling it.
                  </p>
                </div>
              </div>
            </div>
            <div className='story-col-content-wrapper-2'>
              <div className='story-line-mask'>
                <div className='story-line' ref={textLine2Ref}>
                  <h2>
                    Every detail is chosen to <span>bring ease into</span> your
                    space.
                  </h2>
                  <p>
                    From joinery to finish, we shape furniture that reflects how
                    you actually live, not just how a room should look.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className='story-col story-col-4' ref={col4Ref}>
            <div className='story-col-img'>
              <div className='story-col-img-wrapper'>
                <img src='/assets/heavenImage03.png' alt='' />
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className='story-mobile container'>
        <Reveal>
          <h2>We design pieces where comfort meets quiet craftsmanship.</h2>
          <p>
            Grain, texture, and proportion come together to create furniture
            that feels considered, not mass-produced.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className='story-mobile-img'>
            <img src='/assets/about-cta-window.webp' alt='' />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>Every piece is crafted to feel as considered as it looks.</h2>
          <p>
            We balance warmth and precision, so each piece earns its place in
            your home rather than just filling it.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className='story-mobile-img'>
            <img src='/assets/about-cta-window.webp' alt='' />
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>Every detail is chosen to bring ease into your space.</h2>
          <p>
            From joinery to finish, we shape furniture that reflects how you
            actually live, not just how a room should look.
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <div className='story-mobile-img'>
            <img src='/assets/about-cta-window.webp' alt='' />
          </div>
        </Reveal>
      </div>
    </>
  );
};

export default BrandStory;
