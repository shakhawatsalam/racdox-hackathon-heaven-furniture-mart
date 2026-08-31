"use client";
import "./Hero.css";
import { useRef } from "react";
import HeroDissolve from "./Herodissolve";
import WordReveal from "../Wordreveal/WordReveal";
import BrandIntro from "../Brandintro/Brandintro";

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);

  return (
    <section id='hero' className='hero' ref={heroRef}>
      <div className='hero-bg'>
        <img
          src='/assets/about-cta-window.jpg'
          alt='Heaven Furniture Mart showroom'
        />
      </div>
      <div className='hero-gradient' />
      <HeroDissolve containerRef={heroRef} color='#f4f1ea' spread={0.5} />

      <div className='container hero-top'>
        <p className='eyebrow hero-eyebrow'>Est. 2020 · Agrabad, Chattogram</p>
        <h1>Furniture, Crafted Around You</h1>
        <div className='hero-actions'>
          <a href='#cta' className='hero-cta'>
            Request a Quote
          </a>
          <a href='#bespoke' className='hero-secondary'>
            See how it&apos;s made
          </a>
        </div>
      </div>

      <div className='container hero-bottom'>
        {/* <BrandIntro /> */}
        {/* <WordReveal
          as='h2'
          className='hero-reveal-heading'
          text='Every piece begins as raw material and ends as a room that feels entirely yours.'
          start='top 60%'
          end='bottom 15%'
        /> */}
      </div>
    </section>
  );
};

export default Hero;
