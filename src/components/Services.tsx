import { motion } from "framer-motion";
import { services } from "../data/services";

export const Services = () => {
  return (
    <section className="relative bg-[#eeebe8] py-20 px-6 lg:px-12 overflow-hidden">

      {/* Heading */}
      <div className="text-center mb-14">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="font-serif text-[2.2rem] sm:text-[2.8rem] lg:text-[3.5rem] tracking-tight text-[#1a1a1a] leading-tight"
        >
          Styles that speak <span className="italic font-light">for you.</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-4 text-[15px] lg:text-[17px] text-gray-500 max-w-md mx-auto leading-relaxed"
        >
          A space where creativity becomes confidence and attitude, where
          every service is designed to highlight your unique style.
        </motion.p>
      </div>

      {/* Cards */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {services.map((service, i) => (
          <motion.div
            key={service.title}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay: i * 0.15 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm flex flex-col
                 transition-transform duration-300 hover:-translate-y-1 will-change-transform"
          >
            <div className="overflow-hidden h-[220px] sm:h-[240px]">
              <img
                src={service.img}
                alt={service.alt}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>

            <div className="p-5 flex flex-col flex-1">
              <h3 className="font-serif text-[1.1rem] font-semibold text-[#1a1a1a] mb-2">
                {service.title}
              </h3>
              <p className="text-[14px] text-gray-500 leading-relaxed flex-1">
                {service.description}
              </p>

              <button className="mt-5 self-start bg-[#4a2c1f] text-white text-[13px] font-medium
                           px-5 py-2.5 rounded-full transition-transform duration-200
                           hover:scale-105 active:scale-95">
                Book it now!
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex justify-center mt-12"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="border border-[#1a1a1a] text-[#1a1a1a] text-[14px] font-medium px-7 py-3 rounded-full"
        >
          Explore more services
        </motion.button>
      </motion.div>

    </section>
  );
};