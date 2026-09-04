"use client";
import "./Nav.css";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Our Story", href: "#milestones" },
  { label: "Contact", href: "#cta" },
];

const PRIMARY_LINKS = ["Home", "Gallery", "Contact Us", "About Us"];
const SECONDARY_LINKS = [
  "Playground",
  "Build Something",
  "Activity Feed",
  "Profile",
];
const SOCIAL_LINKS = [
  "Bluesky",
  "Pinterest",
  "YouTube",
  "Instagram",
  "LinkedIn",
  "X",
];
const LEGAL_LINKS = [
  "Cookie Policy",
  "Accessibility",
  "Data Rights",
  "Disclosures",
];

const OPEN_CLIP = "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)";
const CLOSED_CLIP = "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)";

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const togglerRef = useRef<HTMLButtonElement>(null);
  const navBgRefs = useRef<(HTMLDivElement | null)[]>([]);
  const navItemsRef = useRef<HTMLDivElement>(null);
  const socialsLegalRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLDivElement>(null);
  const secondaryRef = useRef<HTMLDivElement>(null);

  const tlRef = useRef<gsap.core.Timeline | null>(null);
  const isAnimatingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getLinkBlocks = () => [
    ...(socialsLegalRef.current?.querySelectorAll<HTMLElement>(
      ".nav-link-line",
    ) || []),
    ...(primaryRef.current?.querySelectorAll<HTMLElement>(".nav-link-line") ||
      []),
    ...(secondaryRef.current?.querySelectorAll<HTMLElement>(".nav-link-line") ||
      []),
  ];

  const animateLinksIn = () => {
    const groups = [
      socialsLegalRef.current?.querySelectorAll<HTMLElement>(".nav-link-line"),
      primaryRef.current?.querySelectorAll<HTMLElement>(".nav-link-line"),
      secondaryRef.current?.querySelectorAll<HTMLElement>(".nav-link-line"),
    ];

    groups.forEach((group) => {
      if (!group || group.length === 0) return;
      gsap.fromTo(
        group,
        { y: "100%" },
        {
          y: "0%",
          duration: 0.75,
          stagger: 0.05,
          ease: "power3.out",
          delay: 0.85,
        },
      );
    });
  };

  useEffect(() => {
    const bgs = navBgRefs.current.filter(Boolean);
    if (!bgs.length || !navItemsRef.current) return;

    const tl = gsap.timeline({
      paused: true,
      onComplete: () => {
        isAnimatingRef.current = false;
      },
      onReverseComplete: () => {
        gsap.set(getLinkBlocks(), { y: "100%" });
        document.body.style.overflow = "";
        isAnimatingRef.current = false;
      },
    });

    tl.to(bgs, {
      scaleY: 1,
      duration: 0.75,
      stagger: 0.1,
      ease: "power3.inOut",
    });

    tl.to(
      navItemsRef.current,
      {
        clipPath: OPEN_CLIP,
        duration: 0.75,
        ease: "power3.inOut",
      },
      "-=0.6",
    );

    tlRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const toggleMenu = () => {
    if (isAnimatingRef.current || !tlRef.current) return;
    isAnimatingRef.current = true;

    if (!isOpen) {
      document.body.style.overflow = "hidden";
      tlRef.current.play();
      animateLinksIn();
    } else {
      tlRef.current.reverse();
    }

    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <nav className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
        <div className='container nav-inner'>
          <a href='#hero' className='nav-logo'>
            <Image
              src='/assets/logo.webp'
              alt='Heaven Furniture Mart Logo'
              width={100}
              height={100}
              loading='eager'
            />
          </a>

          <div className='nav-links'>
            {NAV_LINKS.map((link) => (
              <a key={link.href} href={link.href}>
                {link.label}
              </a>
            ))}
          </div>

          <button
            ref={togglerRef}
            className={`nav-toggler ${isOpen ? "open" : ""}`}
            onClick={toggleMenu}
            aria-label='Toggle menu'>
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div className='nav-content'>
        <div
          className='nav-bg'
          ref={(el) => {
            navBgRefs.current[0] = el;
          }}
        />
        <div
          className='nav-bg'
          ref={(el) => {
            navBgRefs.current[1] = el;
          }}
        />
        <div
          className='nav-bg'
          ref={(el) => {
            navBgRefs.current[2] = el;
          }}
        />
        <div
          className='nav-bg'
          ref={(el) => {
            navBgRefs.current[3] = el;
          }}
        />

        <div className='nav-items' ref={navItemsRef}>
          <div className='nav-items-col' ref={socialsLegalRef}>
            <div className='nav-socials'>
              {SOCIAL_LINKS.map((label) => (
                <a href='#' key={label}>
                  <span className='nav-link-mask'>
                    <span className='nav-link-line'>{label}</span>
                  </span>
                </a>
              ))}
            </div>
            <div className='nav-legal'>
              {LEGAL_LINKS.map((label) => (
                <a href='#' key={label}>
                  <span className='nav-link-mask'>
                    <span className='nav-link-line'>{label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>

          <div className='nav-items-col'>
            <div className='nav-primary-links' ref={primaryRef}>
              {PRIMARY_LINKS.map((label) => (
                <a href='#' key={label}>
                  <span className='nav-link-mask'>
                    <span className='nav-link-line'>{label}</span>
                  </span>
                </a>
              ))}
            </div>

            <div className='nav-secondary-links' ref={secondaryRef}>
              {SECONDARY_LINKS.map((label) => (
                <a href='#' key={label}>
                  <span className='nav-link-mask'>
                    <span className='nav-link-line'>{label}</span>
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Nav;
