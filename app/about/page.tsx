import {
  RiAwardLine,
  RiLeafLine,
  RiTeamLine,
  RiFocus3Line,
  RiArmchairLine,
  RiArrowRightLine,
} from "react-icons/ri";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import Reveal from "@/components/Reveal/Reveal";
import Image from "next/image";
import Link from "next/link";
import "./About.css";

const VALUES = [
  {
    icon: <RiAwardLine />,
    title: "Honest Craftsmanship",
    description: "We stay true to our materials and our methods.",
  },
  {
    icon: <RiLeafLine />,
    title: "Sustainable Choices",
    description: "We source responsibly and build furniture that lasts.",
  },
  {
    icon: <RiTeamLine />,
    title: "Customer First",
    description: "Your vision is our priority, always.",
  },
  {
    icon: <RiFocus3Line />,
    title: "Timeless Design",
    description: "We create pieces that remain relevant for years to come.",
  },
];

const MILESTONES = [
  [
    "2020",
    "Founded",
    "Founded by Abul Kalam Bhuiyan with a vision to create bespoke furniture in Chattogram.",
  ],
  [
    "2021",
    "Agrabad Showroom",
    "Opened the Agrabad showroom to bring our designs closer to our customers.",
  ],
  [
    "2024–25",
    "International Furniture Fair",
    "Exhibited at the Int’l Furniture Fair, Chattogram, showcasing our craftsmanship.",
  ],
  ["2025", "Chamber Membership", "Became a member of the Chamber of Commerce."],
  [
    "2026",
    "BFIOA Recognition",
    "Received nationwide BFIOA recognition for our contribution to the industry.",
  ],
];

export default function AboutPage() {
  return (
    <>
      <Nav />
      <main className='about-page'>
        <section className='about-hero'>
          <div className='container about-hero-grid'>
            <div className='about-hero-copy'>
              <Reveal>
                <p className='eyebrow about-eyebrow'>About Us</p>
              </Reveal>
              <Reveal delay={0.1}>
                <h1>
                  Crafted with purpose.
                  <br />
                  Designed for life.
                </h1>
              </Reveal>
              <Reveal delay={0.2}>
                <p className='about-hero-description'>
                  Heaven Furniture Mart is a bespoke furniture and interior
                  styling studio based in Chattogram. We design and craft
                  furniture around what a customer actually wants, not what
                  happens to be on a shelf.
                </p>
              </Reveal>
              <div className='about-pillars'>
                <AboutPillar
                  icon={<RiArmchairLine />}
                  title='Bespoke by design'
                  text='Every piece is custom made for you.'
                />
                <AboutPillar
                  icon={<RiLeafLine />}
                  title='Quality materials'
                  text='Premium wood, durable finishes, lasting beauty.'
                />
                <AboutPillar
                  icon={<RiAwardLine />}
                  title='Made with care'
                  text='Thoughtful craftsmanship in every detail.'
                />
              </div>
            </div>
            <div className='about-hero-image'>
              <Image
                src='/assets/showroomImage03.webp'
                alt='Bespoke wood furniture in an arched interior'
                fill
                priority
                sizes='(max-width: 800px) 100vw, 48vw'
              />
            </div>
          </div>
        </section>

        <section className='about-team'>
          <div className='container about-team-grid'>
            <div className='about-team-copy'>
              <p className='eyebrow'>Who We Are</p>
              <h2>A team of makers, designers, and problem solvers.</h2>
              <p>
                We believe furniture should feel personal, functional, and
                timeless. From concept to installation, we work closely with you
                to bring your space to life.
              </p>
              <Link className='about-outline-button' href='/#cta'>
                Meet the team <RiArrowRightLine />
              </Link>
            </div>
            <div className='about-team-image'>
              <Image
                src='/assets/heavenImage02.png'
                alt='Warm wood sideboard styled with art and greenery'
                fill
                sizes='(max-width: 800px) 100vw, 48vw'
              />
            </div>
          </div>
        </section>

        <section className='about-values'>
          <div className='container'>
            <p className='eyebrow'>Our Values</p>
            <div className='about-values-grid'>
              {VALUES.map((value) => (
                <div className='about-value' key={value.title}>
                  <span>{value.icon}</span>
                  <h3>{value.title}</h3>
                  <p>{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className='about-journey'>
          <div className='container'>
            <p className='eyebrow'>Our Journey</p>
            <h2>A few milestones along the way.</h2>
            <div className='about-timeline'>
              {MILESTONES.map(([year, title, description]) => (
                <article className='about-milestone' key={year}>
                  <span className='about-dot' />
                  <p className='about-year'>{year}</p>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
            <div className='about-cta'>
              <RiArmchairLine />
              <div>
                <h3>Let&apos;s create something extraordinary together.</h3>
                <p>Have a project in mind? We&apos;d love to hear from you.</p>
              </div>
              <Link href='/#cta'>
                Get in touch <RiArrowRightLine />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

function AboutPillar({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <div className='about-pillar'>
      <span>{icon}</span>
      <div>
        <h3>{title}</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}
