"use client";
import "./BrandIntro.css";
import Reveal from "@/components/Reveal/Reveal";

const BrandIntro = () => {
  return (
    <section id='intro' className='brand-intro'>
      <div className='container brand-intro-inner'>
        <Reveal>
          <p className='eyebrow brand-intro-eyebrow'>Who we are</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2>
            A bespoke furniture and interior styling studio, working out of our
            Agrabad showroom in Chattogram.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className='lg brand-intro-copy'>
            We design and craft furniture around what a customer actually wants,
            not what happens to be on a shelf. Every sofa, bed, dining set, and
            workspace piece is built to your space, your size, and your taste —
            then delivered and installed with care.
          </p>
        </Reveal>
      </div>
    </section>
  );
};

export default BrandIntro;
