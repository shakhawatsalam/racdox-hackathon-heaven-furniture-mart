"use client";
import "./PageReveal.css";
import { ReactNode, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

const LOGO_TEXT = "Heaven";
const TAGLINE_WORDS = "Designed. Crafted. Customized.".split(" ");

function animateProgress(fillEl: HTMLElement, duration = 3.2) {
  const tl = gsap.timeline();
  const steps = 5;
  let current = 0;

  for (let i = 0; i < steps; i++) {
    const isLast = i === steps - 1;
    const target = isLast
      ? 1
      : Math.min(current + Math.random() * 0.3 + 0.1, 0.9);
    current = target;

    tl.to(fillEl, {
      scaleX: target,
      duration: duration / steps,
      ease: "power2.out",
    });
  }

  return tl;
}

const PageReveal = ({ children }: { children: ReactNode }) => {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);
  const pillFillRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    if (!preloaderRef.current || !pageRef.current || !pillFillRef.current) {
      return;
    }

    if (window.innerWidth <= 1000) {
      preloaderRef.current.style.display = "none";
      pageRef.current.style.clipPath = "none";
      document.body.style.overflow = "";
      return;
    }

    const logoChars =
      preloaderRef.current.querySelectorAll<HTMLElement>(".preloader-char");
    const taglineWords =
      preloaderRef.current.querySelectorAll<HTMLElement>(".preloader-word");

    document.body.style.overflow = "hidden";

    gsap.set(logoChars, { x: "100%" });
    gsap.set(taglineWords, { y: "100%" });
    gsap.set(pillFillRef.current, { scaleX: 0 });
    gsap.set(pageRef.current, { clipPath: "circle(0vmax at 50vw 50vh)" });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(logoChars, {
      x: "0%",
      stagger: 0.05,
      duration: 0.9,
      ease: "power4.inOut",
    })
      .to(
        taglineWords,
        {
          y: "0%",
          stagger: 0.08,
          duration: 0.8,
          ease: "power4.inOut",
        },
        "-=0.6",
      )
      .add(animateProgress(pillFillRef.current), "<")
      .to(
        logoChars,
        {
          x: "-100%",
          stagger: 0.04,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "-=0.3",
      )
      .to(
        taglineWords,
        {
          y: "-100%",
          stagger: 0.06,
          duration: 0.7,
          ease: "power4.inOut",
        },
        "<",
      )
      .to(
        preloaderRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: "power3.out",
        },
        "-=0.2",
      )
      .to(
        pageRef.current,
        {
          clipPath: "circle(150vmax at 50vw 50vh)",
          duration: 1.6,
          ease: "power3.inOut",
          onComplete: () => {
            document.body.style.overflow = "";
            if (preloaderRef.current) {
              preloaderRef.current.style.display = "none";
            }
            if (pageRef.current) {
              pageRef.current.style.clipPath = "none";
            }
            ScrollTrigger.refresh();
          },
        },
        "<",
      );

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <>
      <div className='preloader' ref={preloaderRef}>
        <div className='preloader-inner'>
          <div className='preloader-pill'>
            <div className='preloader-pill-fill' ref={pillFillRef} />
            <div className='preloader-logo'>
              <h1>
                {LOGO_TEXT.split("").map((char, index) => (
                  <span className='preloader-char-mask' key={index}>
                    <span className='preloader-char'>{char}</span>
                  </span>
                ))}
              </h1>
            </div>
          </div>

          <div className='preloader-footer'>
            <p>
              {TAGLINE_WORDS.map((word, index) => (
                <span className='preloader-word-mask' key={index}>
                  <span className='preloader-word'>{word}</span>
                  {index < TAGLINE_WORDS.length - 1 ? "\u00A0" : ""}
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className='page-reveal' ref={pageRef}>
        {children}
      </div>
    </>
  );
};

export default PageReveal;
