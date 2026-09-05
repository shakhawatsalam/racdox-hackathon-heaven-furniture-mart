"use client";

import Image from "next/image";
import { useState } from "react";
import Nav from "@/components/Nav/Nav";
import Footer from "@/components/Footer/Footer";
import "./Gallery.css";
import { RxCross1 } from "react-icons/rx";

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
    src: "/assets/farImage/farImage01.webp",
    alt: "Handcrafted furniture in a considered interior",
    category: "Living Room",
    className: "gallery-item-featured",
  },
  {
    src: "/assets/farImage/farImage02.webp",
    alt: "Custom bedroom furniture in a warm interior",
    category: "Bedroom",
    className: "gallery-item-featured gallery-item-tall",
  },
  {
    src: "/assets/farImage/farImage03.webp",
    alt: "Sculptural dining furniture in a bright space",
    category: "Dining",
  },
  {
    src: "/assets/farImage/farImage04.webp",
    alt: "Bespoke furniture detail in a refined interior",
    category: "Living Room",
  },
  {
    src: "/assets/farImage/farImage05.webp",
    alt: "Handcrafted bedroom furniture and natural materials",
    category: "Bedroom",
  },
  {
    src: "/assets/farImage/farImage06.webp",
    alt: "Custom dining furniture with considered details",
    category: "Dining",
  },
  {
    src: "/assets/farImage/farImage07.webp",
    alt: "Bespoke furniture crafted for a lived-in space",
    category: "Bespoke",
  },
  {
    src: "/assets/farImage/farImage08.webp",
    alt: "Bespoke timber furniture in a contemporary room",
    category: "Bespoke",
  },
  {
    src: "/assets/farImage/farImage09.webp",
    alt: "Warm living space with handcrafted furniture",
    category: "Living Room",
  },
  {
    src: "/assets/farImage/farImage10.webp",
    alt: "Custom bedroom joinery and furniture",
    category: "Bedroom",
  },
  {
    src: "/assets/farImage/farImage11.webp",
    alt: "Sculptural dining table in a tailored interior",
    category: "Dining",
  },
  {
    src: "/assets/farImage/farImage12.webp",
    alt: "Bespoke furniture detail with natural wood grain",
    category: "Bespoke",
  },
  {
    src: "/assets/farImage/farImage13.webp",
    alt: "Handcrafted furniture in a calm living space",
    category: "Living Room",
  },
  {
    src: "/assets/farImage/farImage14.webp",
    alt: "Bedroom furniture with a considered material palette",
    category: "Bedroom",
  },
  {
    src: "/assets/farImage/farImage15.webp",
    alt: "Custom dining furniture and architectural details",
    category: "Dining",
  },
  {
    src: "/assets/farImage/farImage16.webp",
    alt: "Bespoke furniture made for a distinctive interior",
    category: "Bespoke",
  },
  {
    src: "/assets/farImage/farImage17.webp",
    alt: "Timeless handcrafted furniture in a refined room",
    category: "Bespoke",
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] =
    useState<GalleryCategory>("All Spaces");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);

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
              <GalleryImage
                item={item}
                key={item.src}
                onSelect={setSelectedItem}
              />
            ))}
          </div>
        </section>

        <section className='gallery-grid container' aria-live='polite'>
          {filteredItems.map((item) => (
            <GalleryImage
              item={item}
              key={item.src}
              onSelect={setSelectedItem}
            />
          ))}
        </section>
      </main>
      {selectedItem && (
        <div
          className='gallery-preview'
          role='dialog'
          aria-modal='true'
          aria-label='Image preview'
          onClick={() => setSelectedItem(null)}>
          <div
            className='gallery-preview-content'
            onClick={(event) => event.stopPropagation()}>
            <button
              className='gallery-preview-close'
              type='button'
              aria-label='Close image preview'
              onClick={() => setSelectedItem(null)}>
              <RxCross1 size={16} />
            </button>
            <Image
              src={selectedItem.src}
              alt={selectedItem.alt}
              fill
              sizes='(max-width: 700px) 92vw, 86vw'
            />
          </div>
        </div>
      )}
      <Footer />
    </>
  );
}

function GalleryImage({
  item,
  onSelect,
}: {
  item: GalleryItem;
  onSelect: (item: GalleryItem) => void;
}) {
  return (
    <figure className={`gallery-item ${item.className ?? ""}`}>
      <button
        className='gallery-image-button'
        type='button'
        aria-label={`Preview ${item.alt}`}
        onClick={() => onSelect(item)}>
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes='(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw'
        />
      </button>
    </figure>
  );
}
