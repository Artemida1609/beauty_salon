import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

const preloadImages = (srcs: string[]): Promise<void[]> =>
  Promise.all(
    srcs.map(
      (src) =>
        new Promise<void>((resolve) => {
          const img = new Image();
          img.src = src;
          img.onload = () => resolve();
          img.onerror = () => resolve();
        })
    )
  );

const InfiniteRow = ({
  images,
  direction = "left",
  duration = 30,
}: {
  images: string[];
  direction?: "left" | "right";
  duration?: number;
}) => {
  // Тільки x2 — достатньо для безшовного loop
  const doubled = [...images, ...images];
  const singleSetWidth = images.length * (CARD_WIDTH + GAP);

  return (
    <div className="overflow-hidden w-full">
      <motion.div
        className="flex"
        style={{
          gap: `${GAP}px`,
          willChange: "transform", // GPU прискорення
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
        {doubled.map((src, i) => (
          <div
            key={i}
            className="flex-shrink-0 rounded-2xl overflow-hidden"
            style={{ width: CARD_WIDTH, height: CARD_HEIGHT }}
          >
            <img
              src={src}
              alt=""
              width={CARD_WIDTH}
              height={CARD_HEIGHT}
              // НЕ lazy — фото вже preloaded, lazy тут тільки заважає
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const Gallery = () => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    preloadImages([...row1, ...row2]).then(() => setReady(true));
  }, []);

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
          it's confidence at{" "}
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
        )}
      </AnimatePresence>

    </section>
  );
};