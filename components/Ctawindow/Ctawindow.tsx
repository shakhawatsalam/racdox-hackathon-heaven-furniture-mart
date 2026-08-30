"use client";
import "./CTAWindow.css";
import Reveal from "@/components/Reveal/Reveal";
import { RiWhatsappLine, RiArrowRightLine } from "react-icons/ri";

const CTAWindow = () => {
  return (
    <section id='cta' className='cta-window'>
      <div className='container cta-window-inner'>
        <Reveal>
          <p className='eyebrow cta-eyebrow'>Let&apos;s build it together</p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className='cta-heading'>
            Tell us what you have in mind, and we&apos;ll design it around you.
          </h2>
        </Reveal>

        <Reveal delay={0.2}>
          <div className='cta-actions'>
            <a
              href='mailto:heavenfurnituremart@gmail.com'
              className='cta-primary'>
              Request a Quote <RiArrowRightLine />
            </a>
            <a
              href='https://wa.me/8801960481983'
              target='_blank'
              rel='noopener noreferrer'
              className='cta-secondary'>
              <RiWhatsappLine /> WhatsApp Us
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.3}>
          <div className='cta-contact-line'>
            <a href='tel:+8801960481983'>+880 1960-481983</a>
            <span className='cta-divider'>·</span>
            <a href='mailto:heavenfurnituremart@gmail.com'>
              heavenfurnituremart@gmail.com
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default CTAWindow;
