"use client";
import "./Footer.css";
import {
  RiFacebookBoxLine,
  RiInstagramLine,
  RiYoutubeLine,
} from "react-icons/ri";

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='container footer-inner'>
        <div className='footer-col footer-brand'>
          <p className='footer-logo'>
            <span>Heaven</span> Furniture Mart
          </p>
          <p className='footer-tagline'>Designed. Crafted. Customized.</p>
        </div>

        <div className='footer-col footer-address'>
          <p className='footer-label'>Visit the showroom</p>
          <p>Agrabad Access Road</p>
          <p>Chattogram, Bangladesh</p>
        </div>

        <div className='footer-col footer-contact'>
          <p className='footer-label'>Get in touch</p>
          <a href='tel:+8801960481983'>+880 1960-481983</a>
          <a href='mailto:heavenfurnituremart@gmail.com'>
            heavenfurnituremart@gmail.com
          </a>
        </div>

        <div className='footer-col footer-socials'>
          <p className='footer-label'>Follow along</p>
          <div className='footer-social-icons'>
            <a href='#' aria-label='Facebook'>
              <RiFacebookBoxLine />
            </a>
            <a href='#' aria-label='Instagram'>
              <RiInstagramLine />
            </a>
            <a href='#' aria-label='YouTube'>
              <RiYoutubeLine />
            </a>
          </div>
        </div>
      </div>

      <div className='container footer-bottom'>
        <p>&copy; 2026 Heaven Furniture Mart. All rights reserved.</p>
        <p>Built for the RACDOX Hackathon.</p>
      </div>
    </footer>
  );
};

export default Footer;
