import { memo, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useImagePreload, useLazyImage } from "../hooks/useImagePreload";

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

const CARD_WIDTH = 300;
const CARD_HEIGHT = 210;
const GAP = 12;

// Optimized lazy image component
const LazyGalleryImage = memo(({ src, index }: { src: string; index: number }) => {
  const { imgRef, src: lazySrc, setIsLoaded } = useLazyImage(src, {
    threshold: 0.1,
    rootMargin: "100px",
  });

  return (
    <div
      ref={imgRef}
      className="flex-shrink-0 rounded-2xl overflow-hidden bg-[#e8ddd9]"
      style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
    >
      {lazySrc ? (
        <img
          src={lazySrc}
          alt={`Gallery image ${index + 1}`}
          width={CARD_WIDTH}
          height={CARD_HEIGHT}
          decoding="async"
          onLoad={() => setIsLoaded(true)}
          className="w-full h-full object-cover transition-opacity duration-300"
        />
      ) : (
        <div className="w-full h-full animate-pulse bg-[#e8ddd9]" />
      )}
    </div>
  );
});

LazyGalleryImage.displayName = "LazyGalleryImage";

const InfiniteRow = memo(({
  images,
  direction = "left",
  duration = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  // Triple the images for smoother infinite loop
  const tripled = useMemo(() => [...images, ...images, ...images], [images]);
  const singleSetWidth = images.length * (CARD_WIDTH + GAP);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        style={{
          gap: `${GAP}px`,
          willChange: "transform",
        }}
        animate={{
          x: direction === "left"
            ? [0, -singleSetWidth]
            : [-singleSetWidth, 0],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        {tripled.map((src, i) => (
          <LazyGalleryImage key={`${src}-${i}`} src={src} index={i % images.length} />
        ))}
      </motion.div>
    </div>
  );
});

InfiniteRow.displayName = "InfiniteRow";

// Skeleton loader
const GallerySkeleton = memo(() => (
  <motion.div
    key="skeleton"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col gap-3 px-6"
  >
    {[0, 1].map((row) => (
      <div key={row} className="flex gap-3 overflow-hidden">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl bg-[#e8ddd9] animate-pulse"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          />
        ))}
      </div>
    ))}
  </motion.div>
));

GallerySkeleton.displayName = "GallerySkeleton";

export const Gallery = memo(() => {
  const priorityImages = useMemo(() => [
    "/images/gallery-1.jpg",
    "/images/gallery-2.jpg",
    "/images/gallery-7.jpg",
    "/images/gallery-8.jpg",
  ], []);

  const allImages = useMemo(() => [...row1, ...row2], []);
  
  // Preload priority images immediately, rest with delay
  const { ready } = useImagePreload(allImages, {
    priority: priorityImages,
    delay: 100,
  });

  return (
    <section className="bg-[#f3edeb] py-20 overflow-hidden">
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
          <button className="bg-[#4a2c1f] text-white text-[13px] font-medium px-6 py-2.5
                             rounded-full transition-transform duration-200 hover:scale-105 active:scale-95">
            Book your Appointment
          </button>
          <button className="border border-[#1a1a1a] text-[#1a1a1a] text-[13px] font-medium
                             px-6 py-2.5 rounded-full transition-transform duration-200
                             hover:scale-105 active:scale-95">
            Meet our team
          </button>
        </div>
      </motion.div>

      {/* Gallery */}
      <AnimatePresence mode="wait">
        {ready ? (
          <motion.div
            key="gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3"
          >
            <InfiniteRow images={row1} direction="right" duration={35} />
            <InfiniteRow images={row2} direction="left" duration={28} />
          </motion.div>
        ) : (
          <GallerySkeleton />
        )}
      </AnimatePresence>
    </section>
  );
});

Gallery.displayName = "Gallery";