import { memo } from "react";
import { motion } from "framer-motion";

const galleryImages = [
  { src: "/images/gallery-1.jpg", title: "Classic French", category: "Manicure" },
  { src: "/images/gallery-2.jpg", title: "Gel Extension", category: "Nail Art" },
  { src: "/images/gallery-3.jpg", title: "Spa Treatment", category: "Care" },
  { src: "/images/gallery-4.jpg", title: "3D Design", category: "Art" },
  { src: "/images/gallery-5.jpg", title: "Luxury Polish", category: "Manicure" },
  { src: "/images/gallery-6.jpg", title: "Nail Therapy", category: "Care" },
  { src: "/images/gallery-7.jpg", title: "Bridal Style", category: "Wedding" },
  { src: "/images/gallery-8.jpg", title: "Modern Art", category: "Art" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export const Gallery = memo(() => {
  return (
    <section id="gallery" className="bg-[#f3edeb] py-20 lg:py-28 overflow-hidden">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center px-6 mb-12 lg:mb-16"
      >
        <h2 className="font-serif text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] tracking-tight text-[#1a1a1a] leading-tight">
          Our <span className="italic font-light">masterpieces</span>
        </h2>
        <p className="mt-4 text-gray-600 text-base max-w-lg mx-auto">
          Every nail tells a story — explore our latest creations
        </p>
      </motion.div>

      {/* Bento Grid Gallery */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 auto-rows-min"
        >
          {/* Large featured image */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 row-span-2 relative group cursor-pointer overflow-hidden rounded-2xl lg:rounded-3xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[0].src}
              alt={galleryImages[0].title}
              className="w-full h-full object-cover min-h-[300px] sm:min-h-[400px] lg:min-h-[500px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs sm:text-sm font-medium uppercase tracking-wider">
                {galleryImages[0].category}
              </span>
              <h3 className="text-white text-lg sm:text-xl lg:text-2xl font-medium mt-1">
                {galleryImages[0].title}
              </h3>
            </div>
          </motion.div>

          {/* Medium image */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 sm:col-span-1 relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[1].src}
              alt={galleryImages[1].title}
              className="w-full h-full object-cover min-h-[150px] sm:min-h-[190px] lg:min-h-[240px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs font-medium uppercase tracking-wider">
                {galleryImages[1].category}
              </span>
              <h3 className="text-white text-sm sm:text-base font-medium mt-1">
                {galleryImages[1].title}
              </h3>
            </div>
          </motion.div>

          {/* Medium image */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 sm:col-span-1 relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[2].src}
              alt={galleryImages[2].title}
              className="w-full h-full object-cover min-h-[150px] sm:min-h-[190px] lg:min-h-[240px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs font-medium uppercase tracking-wider">
                {galleryImages[2].category}
              </span>
              <h3 className="text-white text-sm sm:text-base font-medium mt-1">
                {galleryImages[2].title}
              </h3>
            </div>
          </motion.div>

          {/* Small images row */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 sm:col-span-2 grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]">
              <img
                src={galleryImages[3].src}
                alt={galleryImages[3].title}
                className="w-full h-full object-cover min-h-[120px] sm:min-h-[150px] lg:min-h-[190px] transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#c9a99a] text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                  {galleryImages[3].category}
                </span>
                <h3 className="text-white text-xs sm:text-sm font-medium mt-0.5">
                  {galleryImages[3].title}
                </h3>
              </div>
            </div>
            <div className="relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]">
              <img
                src={galleryImages[4].src}
                alt={galleryImages[4].title}
                className="w-full h-full object-cover min-h-[120px] sm:min-h-[150px] lg:min-h-[190px] transition-transform duration-700 group-hover:scale-110"
                loading="lazy"
                decoding="async"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-2 sm:p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="text-[#c9a99a] text-[10px] sm:text-xs font-medium uppercase tracking-wider">
                  {galleryImages[4].category}
                </span>
                <h3 className="text-white text-xs sm:text-sm font-medium mt-0.5">
                  {galleryImages[4].title}
                </h3>
              </div>
            </div>
          </motion.div>

          {/* Bottom row - wide image */}
          <motion.div
            variants={itemVariants}
            className="col-span-2 sm:col-span-2 relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[5].src}
              alt={galleryImages[5].title}
              className="w-full h-full object-cover min-h-[150px] sm:min-h-[180px] lg:min-h-[220px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 lg:p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs font-medium uppercase tracking-wider">
                {galleryImages[5].category}
              </span>
              <h3 className="text-white text-base sm:text-lg font-medium mt-1">
                {galleryImages[5].title}
              </h3>
            </div>
          </motion.div>

          {/* Bottom row - two smaller images */}
          <motion.div
            variants={itemVariants}
            className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[6].src}
              alt={galleryImages[6].title}
              className="w-full h-full object-cover min-h-[150px] sm:min-h-[180px] lg:min-h-[220px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs font-medium uppercase tracking-wider">
                {galleryImages[6].category}
              </span>
              <h3 className="text-white text-sm sm:text-base font-medium mt-1">
                {galleryImages[6].title}
              </h3>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="col-span-1 relative group cursor-pointer overflow-hidden rounded-xl lg:rounded-2xl bg-[#e8ddd9]"
          >
            <img
              src={galleryImages[7].src}
              alt={galleryImages[7].title}
              className="w-full h-full object-cover min-h-[150px] sm:min-h-[180px] lg:min-h-[220px] transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              <span className="text-[#c9a99a] text-xs font-medium uppercase tracking-wider">
                {galleryImages[7].category}
              </span>
              <h3 className="text-white text-sm sm:text-base font-medium mt-1">
                {galleryImages[7].title}
              </h3>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center mt-12 lg:mt-16 px-6"
      >
        <button
          onClick={() => document.querySelector("#team")?.scrollIntoView({ behavior: "smooth" })}
          className="bg-[#4a2c1f] text-white text-sm font-medium px-8 py-3.5 rounded-full 
                     transition-all duration-300 hover:scale-105 hover:shadow-lg active:scale-95"
        >
          Book Your Session
        </button>
      </motion.div>
    </section>
  );
});

Gallery.displayName = "Gallery";