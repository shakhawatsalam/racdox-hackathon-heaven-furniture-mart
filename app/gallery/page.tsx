"use client";

import Image from "next/image";
import { useState } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "./Gallery.css";

type GalleryCategory =
  | "All Spaces"
  | "Living Room"
  | "Bedroom"
  | "Dining"
  | "Bespoke";

type GalleryItem = {
  src: string;
  alt: string;
  category: Exclude<GalleryCategory, "All Spaces">;
  className?: string;
};

const CATEGORIES: GalleryCategory[] = [
  "All Spaces",
  "Living Room",
  "Bedroom",
  "Dining",
  "Bespoke",
];

const GALLERY_ITEMS: GalleryItem[] = [
  {
    src: "/assets/heavenImage01.png",
    alt: "Warm living room with a low wooden media console",
    category: "Living Room",
    className: "gallery-item-featured",
  },
  {
    src: "/assets/heavenImage02.png",
    alt: "Bedroom with a custom dark wood bed and built-in storage",
    category: "Bedroom",
    className: "gallery-item-featured gallery-item-tall",
  },
  {
    src: "/assets/heavenImage03.png",
    alt: "Dining room with a sculptural wood table and pendant lights",
    category: "Dining",
  },
  {
    src: "/assets/step1v2.webp",
    alt: "Workshop table prepared with timber samples",
    category: "Bespoke",
  },
  {
    src: "/assets/step2v2.webp",
    alt: "Furniture maker's bench with a timber frame in progress",
    category: "Bespoke",
  },
  {
    src: "/assets/step3v2.webp",
    alt: "Handcrafted chair frame in the workshop",
    category: "Bespoke",
  },
  {
    src: "/assets/step4v2.webp",
    alt: "Finished upholstered chair in a considered interior",
    category: "Bespoke",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All Spaces");

  const filteredItems =
    activeCategory === "All Spaces"
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <>
      <Nav />
      <main className='gallery-page'>
        <section className='gallery-intro container'>
          <div className='gallery-intro-copy'>
            <p className='eyebrow gallery-eyebrow'>Gallery</p>
            <h1>
              Crafted spaces,
              <br />
              timeless inspiration.
            </h1>
            <p className='gallery-description'>
              Explore a curated gallery of our handcrafted furniture in real
              spaces, each telling its own story.
            </p>

            <div className='gallery-filters' aria-label='Filter gallery spaces'>
              {CATEGORIES.map((category) => (
                <button
                  className={activeCategory === category ? "active" : ""}
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  type='button'>
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className='gallery-featured-grid'>
            {GALLERY_ITEMS.slice(0, 1).map((item) => (
              <GalleryImage item={item} key={item.src} />
            ))}
          </div>
        </section>

        <section className='gallery-grid container' aria-live='polite'>
          {filteredItems.map((item) => (
            <GalleryImage item={item} key={item.src} />
          ))}
        </section>
      </main>
      <Footer />
    </>
  );
}

function GalleryImage({ item }: { item: GalleryItem }) {
  return (
    <figure className={`gallery-item ${item.className ?? ""}`}>
      <Image
        src={item.src}
        alt={item.alt}
        fill
        sizes='(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'
      />
    </figure>
  );
}
