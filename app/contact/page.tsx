"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import { RiClockwise2Line, RiMailLine, RiMapPinLine, RiPhoneLine, RiSendPlaneLine } from "react-icons/ri";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "./Contact.css";

const CONTACT_DETAILS = [
  { icon: <RiMapPinLine />, label: "Visit our showroom", text: <>Agrabad Access Road, Chowmuhani<br />Chattogram 4100, Bangladesh</> },
  { icon: <RiPhoneLine />, label: "Call us", text: <a href="tel:+8801712345678">+880 1712 345 678</a> },
  { icon: <RiMailLine />, label: "Email us", text: <a href="mailto:hello@heavenfurnituremart.com">hello@heavenfurnituremart.com</a> },
  { icon: <RiClockwise2Line />, label: "Showroom hours", text: <>Saturday – Thursday<br />10:00 AM – 8:00 PM</> },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Nav />
      <main className="contact-page">
        <section className="contact-hero">
          <div className="container contact-hero-grid">
            <div className="contact-intro">
              <p className="eyebrow">Contact Us</p>
              <h1>We&apos;d love to hear<br />from you.</h1>
              <p className="contact-lede">Have a question, idea, or project in mind?<br />Let&apos;s bring it to life — together.</p>
              <div className="contact-details">
                {CONTACT_DETAILS.map((detail) => (
                  <div className="contact-detail" key={detail.label}>
                    <span className="contact-detail-icon">{detail.icon}</span>
                    <div><p>{detail.label}</p><div>{detail.text}</div></div>
                  </div>
                ))}
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit}>
              <h2>Send us a message</h2>
              <p>Fill out the form and our team will get back to you shortly.</p>
              <div className="contact-form-grid">
                <label><span className="sr-only">Your Name</span><input name="name" placeholder="Your Name" required /></label>
                <label><span className="sr-only">Email Address</span><input name="email" type="email" placeholder="Email Address" required /></label>
              </div>
              <label><span className="sr-only">Phone Number</span><input name="phone" placeholder="Phone Number" /></label>
              <label><span className="sr-only">Subject</span><input name="subject" placeholder="Subject" required /></label>
              <label><span className="sr-only">Your Message</span><textarea name="message" placeholder="Your Message" required /></label>
              <button type="submit"><RiSendPlaneLine />{submitted ? "Message sent" : "Send message"}</button>
              {submitted && <p className="contact-form-success" role="status">Thank you. We&apos;ll be in touch shortly.</p>}
            </form>
          </div>
        </section>

        <section className="contact-story">
          <div className="container contact-story-grid">
            <div className="contact-story-copy">
              <p className="eyebrow">Who We Are</p>
              <h2>A bespoke furniture and interior styling studio, working out of our Agrabad showroom in Chattogram.</h2>
              <p>We design and craft furniture around what a customer actually wants, not what happens to be on a shelf. Every sofa, bed, dining set, and workspace piece is built to your space, your size, and your taste — then delivered and installed with care.</p>
            </div>
            <div className="contact-story-image"><Image src="/assets/heavenImage02.png" alt="Warm wood sideboard in the Heaven showroom" fill sizes="(max-width: 800px) 100vw, 48vw" /></div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}