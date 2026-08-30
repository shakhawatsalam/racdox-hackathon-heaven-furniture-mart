"use client";
import "./Hero.css";

const Hero = () => {
  return (
    <section id='hero' className='hero'>
      <div className='hero-bg'>
        <img
          src='/assets/about-cta-window.jpg'
          alt='Heaven Furniture Mart showroom'
        />
      </div>
      <div className='hero-gradient' />

      <div className='container hero-content'>
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
    </section>
  );
};

export default Hero;
