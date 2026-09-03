"use client";
import "./WhyHeaven.css";
import Reveal from "@/components/Reveal/Reveal";

import {
  RiCompasses2Line,
  RiRulerLine,
  RiHammerLine,
  RiStore2Line,
  RiTruckLine,
  RiWallet3Line,
  RiAwardLine,
  RiCheckLine,
} from "react-icons/ri";

type TrustPoint = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const TRUST_POINTS: TrustPoint[] = [
  {
    icon: <RiCompasses2Line />,
    title: "Free Consultation",
    description: "We start by listening — no cost, no obligation.",
  },
  {
    icon: <RiRulerLine />,
    title: "Fully Bespoke",
    description: "Built to your space, your measurements, your taste.",
  },
  {
    icon: <RiHammerLine />,
    title: "Premium Craftsmanship",
    description: "Skilled in-house craft, quality wood throughout.",
  },
  {
    icon: <RiStore2Line />,
    title: "A Showroom to Visit",
    description: "See and feel the work in person, in Agrabad.",
  },
  {
    icon: <RiTruckLine />,
    title: "Delivery & Installation",
    description: "Included — your piece arrives ready to live with.",
  },
  {
    icon: <RiWallet3Line />,
    title: "Easy Payment Options",
    description: "Flexible terms so bespoke stays within reach.",
  },
];

const WhyHeaven = () => {
  return (
    <section id='why-heaven' className='why-heaven'>
      <div className='container'>
        <div className='why-heaven-header'>
          <Reveal>
            <p className='eyebrow why-heaven-eyebrow'>Why Choose Heaven</p>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className='why-heaven-heading'>
              Furniture built for <span>lasting elegance</span>.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className='lg why-heaven-subheading'>
              We are dedicated to crafting furniture and creating spaces that
              feel personal, considered, and made to last.
            </p>
          </Reveal>
        </div>

        <div className='why-heaven-grid'>
          {TRUST_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={(index % 3) * 0.08}>
              <div className='why-heaven-card'>
                <div className='why-heaven-icon'>{point.icon}</div>
                <h3>{point.title}</h3>
                <p>{point.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <div className='why-heaven-trustbar'>
            <div className='why-heaven-trustbar-left'>
              <span className='why-heaven-trustbar-icon'>
                <RiAwardLine />
              </span>
              <p>Trusted by hundreds of happy homeowners.</p>
            </div>
            <div className='why-heaven-trustbar-right'>
              <RiCheckLine />
              <span>Since 2020</span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default WhyHeaven;
