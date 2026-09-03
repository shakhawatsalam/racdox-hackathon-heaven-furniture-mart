"use client";
import "./Nav.css";

import { useEffect, useState } from "react";
import Image from "next/image";

const NAV_LINKS = [
  { label: "Collections", href: "#collections" },
  { label: "Bespoke", href: "#bespoke" },
  { label: "Our Story", href: "#milestones" },
  { label: "Contact", href: "#cta" },
];

const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
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

        <a href='#cta' className='nav-cta'>
          Request a Quote
        </a>
      </div>
    </nav>
  );
};

export default Nav;
