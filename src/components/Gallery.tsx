import { memo, useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";

const row1 = [
  "/images/gallery-1.jpg",
  "/images/gallery-2.jpg",
  "/images/gallery-3.jpg",
  "/images/gallery-4.jpg",
  "/images/gallery-5.jpg",
  "/images/gallery-6.jpg",
];

const row2 = [
  "/images/gallery-7.jpg",
  "/images/gallery-8.jpg",
  "/images/gallery-9.jpg",
  "/images/gallery-10.jpg",
  "/images/gallery-11.jpg",
  "/images/gallery-12.jpg",
];

const CARD_WIDTH = 280;
const CARD_HEIGHT = 200;
const GAP = 8;

// CSS-based infinite scroll component - much smoother than JS animation
const InfiniteRowCSS = memo(({
  images,
  direction = "left",
  duration = 40,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  // Double the images for seamless loop
  const allImages = useMemo(() => [...images, ...images], [images]);
  
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex gallery-scroll"
        style={{
          gap: `${GAP}px`,
          animation: `${direction === "left" ? "scroll-left" : "scroll-right"} ${duration}s linear infinite`,
          width: "fit-content",
        }}
      >
        {allImages.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="flex-shrink-0 rounded-xl overflow-hidden bg-[#e8ddd9] relative group"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            <img
              src={src}
              alt={`Gallery ${i + 1}`}
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>
        ))}
      </div>
    </div>
  );
});

InfiniteRowCSS.displayName = "InfiniteRowCSS";

export const Gallery = memo(() => {
  const [isLoaded, setIsLoaded] = useState(false);

  // Preload first few images
  useEffect(() => {
    const preloadImages = async () => {
      const priorityImages = [
        "/images/gallery-1.jpg",
        "/images/gallery-2.jpg",
        "/images/gallery-7.jpg",
        "/images/gallery-8.jpg",
      ];
      
      await Promise.all(
        priorityImages.map((src) => {
          return new Promise<void>((resolve) => {
            const img = new Image();
            img.src = src;
            img.onload = () => resolve();
            img.onerror = () => resolve();
          });
        })
      );
      
      setIsLoaded(true);
    };
    
    preloadImages();
  }, []);

  return (
    <section id="gallery" className="bg-[#f3edeb] py-20 overflow-hidden">
      {/* CSS Animations */}
      <style>{`
        @keyframes scroll-left {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .gallery-scroll {
          will-change: transform;
        }
        .gallery-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center px-6 mb-12"
      >
        <h2 className="font-serif text-[2.2rem] sm:text-[2.8rem] lg:text-[3.2rem] tracking-tight text-[#1a1a1a] leading-tight">
          More than beauty —<br />
          it&apos;s confidence at{" "}
          <span className="italic font-light">your fingertips.</span>
        </h2>

        <div className="flex flex-wrap justify-center gap-3 mt-8">
          <button 
            onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-[#4a2c1f] text-white text-[13px] font-medium px-6 py-2.5
                             rounded-full transition-transform duration-200 hover:scale-105 active:scale-95">
            Book your Appointment
          </button>
          <button 
            onClick={() => document.querySelector('#team')?.scrollIntoView({ behavior: 'smooth' })}
            className="border border-[#1a1a1a] text-[#1a1a1a] text-[13px] font-medium
                             px-6 py-2.5 rounded-full transition-transform duration-200
                             hover:scale-105 active:scale-95">
            Meet our team
          </button>
        </div>
      </motion.div>

      {/* Gallery - Render only when loaded */}
      {isLoaded ? (
        <div className="flex flex-col gap-3">
          <InfiniteRowCSS images={row1} direction="right" duration={50} />
          <InfiniteRowCSS images={row2} direction="left" duration={45} />
        </div>
      ) : (
        <div className="flex flex-col gap-3 px-6">
          {[0, 1].map((row) => (
            <div key={row} className="flex gap-3 overflow-hidden">
              {Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 rounded-xl bg-[#e8ddd9] animate-pulse"
                  style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </section>
  );
});

Gallery.displayName = "Gallery";