"use client";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";
import {
  RiArrowRightLine,
  RiFacebookBoxLine,
  RiInstagramLine,
  RiMailLine,
  RiMapPinLine,
  RiPhoneLine,
  RiTimeLine,
  RiYoutubeLine,
} from "react-icons/ri";

const exploreLinks = [
  { label: "Collections", href: "/#collections" },
  { label: "Bespoke", href: "/#bespoke" },
  { label: "Our Story", href: "/about" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const collectionLinks = [
  { label: "Living Room", href: "/#collections" },
  { label: "Bedroom", href: "/#collections" },
  { label: "Dining", href: "/#collections" },
  { label: "Office", href: "/#collections" },
  { label: "Bespoke", href: "/#bespoke" },
];

const informationLinks = [
  { label: "FAQ", href: "/contact" },
  { label: "Care Guide", href: "/about" },
  { label: "Delivery", href: "/contact" },
  { label: "Returns & Refunds", href: "/contact" },
  { label: "Privacy Policy", href: "/contact" },
];

const Footer = () => {
  return (
    <footer className='footer'>
      <span className='footer-watermark' aria-hidden='true'>
        HEAVEN
      </span>

      <div className='container footer-container'>
        <section
          className='footer-newsletter'
          aria-labelledby='newsletter-title'>
          <div className='footer-newsletter-copy'>
            <p className='footer-kicker'>Stay inspired</p>
            <h2 id='newsletter-title'>Bring beautiful ideas home.</h2>
            <p>
              Subscribe for new collections, design inspiration and thoughtful
              updates from Heaven.
            </p>
          </div>

          <form className='footer-newsletter-form'>
            <label htmlFor='footer-email'>Email address</label>
            <input
              id='footer-email'
              name='email'
              type='email'
              placeholder='Your email address'
              autoComplete='email'
              required
            />
            <button type='submit' aria-label='Subscribe to newsletter'>
              <RiArrowRightLine aria-hidden='true' />
            </button>
          </form>
        </section>

        <div className='footer-rule' />

        <div className='footer-content'>
          <div className='footer-brand'>
            <Link
              href='/'
              className='footer-logo'
              aria-label='Heaven Furniture Mart home'>
              <Image
                src='/assets/logo.webp'
                alt='Heaven Furniture Mart'
                width={150}
                height={60}
              />
            </Link>
            <h3>Crafted spaces, timeless inspiration.</h3>
            <p>
              Thoughtfully designed furniture, crafted around the way you live.
            </p>
            <div className='footer-socials' aria-label='Social media links'>
              <a
                href='https://www.facebook.com/HeavenFurnitureMart'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Facebook'>
                <RiFacebookBoxLine aria-hidden='true' />
              </a>
              <a
                href='https://www.instagram.com/heaven_furniture_ltd'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='Instagram'>
                <RiInstagramLine aria-hidden='true' />
              </a>
              <a
                href='https://www.youtube.com/@HeavenFurnitureMart'
                target='_blank'
                rel='noopener noreferrer'
                aria-label='YouTube'>
                <RiYoutubeLine aria-hidden='true' />
              </a>
            </div>
          </div>

          <FooterLinks title='Explore' links={exploreLinks} />
          <FooterLinks title='Collections' links={collectionLinks} />
          <FooterLinks title='Information' links={informationLinks} />

          <div className='footer-column footer-contact'>
            <p className='footer-label'>Get in touch</p>
            <address>
              <a
                href='https://maps.google.com/?q=Agrabad+Access+Road,+Chattogram'
                target='_blank'
                rel='noopener noreferrer'>
                <RiMapPinLine aria-hidden='true' />
                <span>
                  Agrabad Access Road,
                  <br />
                  Chowmuhani, Chattogram 4100
                </span>
              </a>
              <a href='tel:+8801960481983'>
                <RiPhoneLine aria-hidden='true' />
                <span>+880 1960-481983</span>
              </a>
              <a href='mailto:heavenfurnituremart@gmail.com'>
                <RiMailLine aria-hidden='true' />
                <span>heavenfurnituremart@gmail.com</span>
              </a>
              <p>
                <RiTimeLine aria-hidden='true' />
                <span>Mon – Sun: 10:00 AM – 8:00 PM</span>
              </p>
            </address>
          </div>
        </div>

        <div className='footer-bottom'>
          <p>© 2026 Heaven Furniture Mart. All rights reserved.</p>
          <div className='footer-legal'>
            <Link href='/contact'>Privacy Policy</Link>
            <span aria-hidden='true'>|</span>
            <Link href='/contact'>Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

type FooterLink = { label: string; href: string };

const FooterLinks = ({
  title,
  links,
}: {
  title: string;
  links: FooterLink[];
}) => (
  <nav className='footer-column' aria-label={title}>
    <p className='footer-label'>{title}</p>
    <ul>
      {links.map((link) => (
        <li key={link.label}>
          <Link href={link.href}>{link.label}</Link>
        </li>
      ))}
    </ul>
  </nav>
);

export default Footer;
