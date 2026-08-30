import Hero from "@/components/Hero/Hero";
import Nav from "@/components/Nav/Nav";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <section id='intro'>{/* Brand Intro — step: pending */}</section>
        <section id='why-heaven'>
          {/* Why Choose Heaven — step: pending */}
        </section>
        <section id='collections'>
          {/* Collections Snapshot — step: pending */}
        </section>
        <section id='bespoke'>
          {/* Bespoke Highlight / signature scroll sequence — step: pending */}
        </section>
        <section id='proof'>{/* Social Proof — step: pending */}</section>
        <section id='cta'>{/* CTA Window — step: pending */}</section>
      </main>
      {/* Footer — step: pending */}
    </>
  );
}
