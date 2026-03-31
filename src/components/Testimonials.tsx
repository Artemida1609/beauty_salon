import { memo, useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyImage } from "../hooks/useImagePreload";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Regular Client",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    text: "The attention to detail is incredible. My nails have never looked better, and the atmosphere is so relaxing. I wouldn't go anywhere else!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Thompson",
    role: "Bride",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    text: "They did my bridal nails and they were absolutely perfect. The nail art was exactly what I envisioned. Thank you for making my day special!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Chen",
    role: "Monthly Member",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    text: "I've been coming here for over a year now. The quality is consistent, the staff is friendly, and my gel nails always last for weeks. Highly recommend!",
    rating: 5,
  },
];

const TestimonialCard = memo(({ testimonial }: { testimonial: typeof testimonials[0] }) => {
  const { imgRef, src: lazySrc } = useLazyImage(testimonial.image, {
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl w-full">
      <div className="flex items-center gap-4 mb-4 sm:mb-6">
        <div
          ref={imgRef}
          className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-[#e8ddd9] flex-shrink-0"
        >
          {lazySrc ? (
            <img
              src={lazySrc}
              alt={testimonial.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full animate-pulse bg-[#e8ddd9]" />
          )}
        </div>
        <div>
          <h4 className="font-medium text-[#1a1a1a] text-sm sm:text-base">{testimonial.name}</h4>
          <p className="text-xs sm:text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-3 sm:mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-[#c9a99a] text-base sm:text-lg">★</span>
        ))}
      </div>
      
      <p className="text-gray-600 leading-relaxed text-sm sm:text-[15px]">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </div>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export const Testimonials = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((newDirection: number) => {
    setDirection(newDirection);
    setActiveIndex((prev) => {
      let next = prev + newDirection;
      if (next < 0) next = testimonials.length - 1;
      if (next >= testimonials.length) next = 0;
      return next;
    });
  }, []);

  // Auto-play carousel
  useEffect(() => {
    const timer = setInterval(() => {
      paginate(1);
    }, 5000);
    return () => clearInterval(timer);
  }, [paginate]);

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
    }),
  };

  return (
    <section id="testimonials" className="bg-gradient-to-br from-[#fdf8f5] via-white to-[#f9f1ed] py-16 sm:py-24 px-4 sm:px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-10 sm:mb-16"
        >
          <h2 className="font-serif text-[1.8rem] sm:text-[2.2rem] lg:text-[3rem] tracking-tight text-[#1a1a1a] leading-tight">
            What our <span className="italic font-light">clients</span> say
          </h2>
          <p className="mt-3 text-gray-500 text-sm sm:text-[15px] max-w-sm mx-auto leading-relaxed">
            Real experiences from our beloved customers
          </p>
        </motion.div>

        {/* Mobile Carousel */}
        <div className="lg:hidden relative">
          <div className="relative h-[280px] sm:h-[250px]">
            <AnimatePresence initial={false} custom={direction} mode="popLayout">
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 },
                }}
                className="absolute inset-0 w-full"
              >
                <TestimonialCard testimonial={testimonials[activeIndex]} />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows Mobile */}
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => paginate(-1)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4a2c1f] hover:bg-[#4a2c1f] hover:text-white transition-colors"
            >
              ←
            </button>
            <button
              onClick={() => paginate(1)}
              className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center text-[#4a2c1f] hover:bg-[#4a2c1f] hover:text-white transition-colors"
            >
              →
            </button>
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <TestimonialCard testimonial={testimonial} />
            </motion.div>
          ))}
        </div>

        {/* Dots Navigation (Mobile Only) */}
        <div className="flex justify-center gap-2 mt-6 lg:hidden">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > activeIndex ? 1 : -1);
                setActiveIndex(index);
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === activeIndex
                  ? "bg-[#4a2c1f] w-6"
                  : "bg-[#c9a99a] w-2 hover:bg-[#4a2c1f]"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";
