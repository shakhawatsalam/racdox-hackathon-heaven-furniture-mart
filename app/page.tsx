import BespokeHighlight from "@/components/BespokeHighlight/BespokeHighlight";
import BrandIntro from "@/components/Brandintro/Brandintro";
import BrandStory from "@/components/BrandStory/BrandStory";
import CollectionsSnapshot from "@/components/CollectionCard/CollectionsSnapshot";
import CTAWindow from "@/components/Ctawindow/Ctawindow";
import Footer from "@/components/Footer/Footer";
import Hero from "@/components/Hero/Hero";
import Milestones from "@/components/Milestones/Milestones";
import Nav from "@/components/Nav/Nav";
import SocialProof from "@/components/SocialProof/Socialproof";
import WhyHeaven from "@/components/WhyHeaven/WhyHeaven";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <BrandIntro />
        <WhyHeaven />
        <CollectionsSnapshot />
        <BespokeHighlight />
        <BrandStory />
        <SocialProof />
        <Milestones />
        <CTAWindow />
      </main>
      <Footer />
    </>
  );
}
