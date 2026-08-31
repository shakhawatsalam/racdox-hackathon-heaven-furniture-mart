"use client";
import WordReveal from "../Wordreveal/WordReveal";
import "./BrandIntro.css";
import Reveal from "@/components/Reveal/Reveal";

const BrandIntro = () => {
  return (
    <section id='intro' className='brand-intro'>
      <div className='container brand-intro-inner'>
        <Reveal>
          <p className='eyebrow brand-intro-eyebrow'>Who we are</p>
        </Reveal>
        <WordReveal
          as='h2'
          text='A bespoke furniture and interior styling studio, working out of our Agrabad showroom in Chattogram.'
          start='top 75%'
          end='bottom 45%'
        />
        <WordReveal
          as='p'
          className='lg brand-intro-copy'
          text='We design and craft furniture around what a customer actually wants, not what happens to be on a shelf. Every sofa, bed, dining set, and workspace piece is built to your space, your size, and your taste — then delivered and installed with care.'
          start='top 45%'
          end='bottom 30%'
        />
      </div>
    </section>
  );
};

export default BrandIntro;
