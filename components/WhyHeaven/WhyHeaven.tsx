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
  RiHeartLine,
} from "react-icons/ri";

type TrustPoint = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

const TRUST_POINTS: TrustPoint[] = [
  {
    icon: <RiCompasses2Line />,
    title: "Free design consultation",
    description: "We start by listening — no cost, no obligation.",
  },
  {
    icon: <RiRulerLine />,
    title: "Fully bespoke",
    description: "Built to your space, your measurements, your taste.",
  },
  {
    icon: <RiHammerLine />,
    title: "Premium materials & craft",
    description: "Skilled in-house craftsmanship, quality wood throughout.",
  },
  {
    icon: <RiStore2Line />,
    title: "A showroom you can visit",
    description: "See and feel the work in person, in Agrabad.",
  },
  {
    icon: <RiTruckLine />,
    title: "Delivery & installation",
    description: "Included — your piece arrives ready to live with.",
  },
  {
    icon: <RiWallet3Line />,
    title: "Easy payment options",
    description: "Flexible terms so bespoke stays within reach.",
  },
  {
    icon: <RiHeartLine />,
    title: "Hundreds of happy homeowners",
    description: "Trusted across Chattogram since 2020.",
  },
];

const WhyHeaven = () => {
  return (
    <section id='why-heaven' className='why-heaven'>
      <div className='container'>
        <Reveal>
          <p className='eyebrow why-heaven-eyebrow'>Why choose Heaven</p>
        </Reveal>

        <div className='why-heaven-list'>
          {TRUST_POINTS.map((point, index) => (
            <Reveal key={point.title} delay={index * 0.05}>
              <div className='why-heaven-row'>
                <div className='why-heaven-icon'>{point.icon}</div>
                <div className='why-heaven-text'>
                  <h3>{point.title}</h3>
                  <p>{point.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyHeaven;
