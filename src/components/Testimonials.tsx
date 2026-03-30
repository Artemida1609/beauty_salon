import { memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLazyImage } from "../hooks/useImagePreload";

const testimonials = [
  {
    id: 1,
    name: "Sarah Mitchell",
    role: "Regular Client",
    image: "/images/gallery-13.jpg",
    text: "The attention to detail is incredible. My nails have never looked better, and the atmosphere is so relaxing. I wouldn't go anywhere else!",
    rating: 5,
  },
  {
    id: 2,
    name: "Emma Thompson",
    role: "Bride",
    image: "/images/gallery-14.jpg",
    text: "They did my bridal nails and they were absolutely perfect. The nail art was exactly what I envisioned. Thank you for making my day special!",
    rating: 5,
  },
  {
    id: 3,
    name: "Jessica Chen",
    role: "Monthly Member",
    image: "/images/gallery-3.jpg",
    text: "I've been coming here for over a year now. The quality is consistent, the staff is friendly, and my gel nails always last for weeks. Highly recommend!",
    rating: 5,
  },
];

const TestimonialCard = memo(({ testimonial, isActive }: { testimonial: typeof testimonials[0]; isActive: boolean }) => {
  const { imgRef, src: lazySrc } = useLazyImage(testimonial.image, {
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: isActive ? 1 : 0.3, scale: isActive ? 1 : 0.9 }}
      transition={{ duration: 0.5 }}
      className={`bg-white rounded-3xl p-8 shadow-xl max-w-md mx-auto ${isActive ? 'z-10' : 'z-0'}`}
    >
      <div className="flex items-center gap-4 mb-6">
        <div
          ref={imgRef}
          className="w-16 h-16 rounded-full overflow-hidden bg-[#e8ddd9] flex-shrink-0"
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
          <h4 className="font-medium text-[#1a1a1a]">{testimonial.name}</h4>
          <p className="text-sm text-gray-500">{testimonial.role}</p>
        </div>
      </div>
      
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <span key={i} className="text-[#c9a99a] text-lg">★</span>
        ))}
      </div>
      
      <p className="text-gray-600 leading-relaxed text-[15px]">
        &ldquo;{testimonial.text}&rdquo;
      </p>
    </motion.div>
  );
});

TestimonialCard.displayName = "TestimonialCard";

export const Testimonials = memo(() => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="bg-gradient-to-br from-[#fdf8f5] via-white to-[#f9f1ed] py-24 px-6 lg:px-12 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[2.2rem] sm:text-[3rem] tracking-tight text-[#1a1a1a] leading-tight">
            What our <span className="italic font-light">clients</span> say
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] max-w-sm mx-auto leading-relaxed">
            Real experiences from our beloved customers
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {testimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className={`${index === activeIndex ? 'lg:scale-110' : 'lg:scale-100 hidden lg:block'} transition-all duration-500`}
                  onClick={() => setActiveIndex(index)}
                >
                  <TestimonialCard
                    testimonial={testimonial}
                    isActive={index === activeIndex}
                  />
                </div>
              ))}
            </AnimatePresence>
          </div>

          {/* Mobile: Show only active */}
          <div className="lg:hidden">
            <TestimonialCard
              testimonial={testimonials[activeIndex]}
              isActive={true}
            />
          </div>

          {/* Dots Navigation */}
          <div className="flex justify-center gap-2 mt-10">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-[#4a2c1f] w-8"
                    : "bg-[#c9a99a] hover:bg-[#4a2c1f]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
});

Testimonials.displayName = "Testimonials";
