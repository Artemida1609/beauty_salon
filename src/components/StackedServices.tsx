import { memo, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    title: "Classic Care",
    subtitle: "Essential Manicure",
    img: "/images/service-img1.jpg",
    color: "#e8e0db",
    textColor: "#1a1a1a",
    bulletColor: "#4a2c1f",
    items: [
      "Nail shaping tailored to your natural structure",
      "Gentle cuticle care to promote healthy growth",
      "Hydration treatment for softer, smoother hands",
      "Clean, polished finish in the color of your choice",
      "Fresh, natural look that suits any style",
    ],
  },
  {
    title: "Gel & Long-Lasting Nails",
    subtitle: "Professional Gel",
    img: "/images/service-img2.jpg",
    color: "#4a2c1f",
    textColor: "#ffffff",
    bulletColor: "#f3cfc2",
    items: [
      "Long-lasting gel formula up to 3 weeks",
      "No chipping, no peeling — perfect finish",
      "Wide range of colors and finishes",
      "UV-cured for maximum durability",
      "Gentle removal process included",
    ],
  },
  {
    title: "Custom Nail Art",
    subtitle: "Creative Designs",
    img: "/images/service-img3.jpg",
    color: "#2c1a14",
    textColor: "#ffffff",
    bulletColor: "#f3cfc2",
    items: [
      "Fully custom designs tailored to your vision",
      "Hand-painted art and premium nail foils",
      "Minimalist to maximalist — any style",
      "Seasonal and occasion-themed collections",
      "Consultation included before every session",
    ],
  },
  {
    title: "Spa & Deep Care",
    subtitle: "Luxury Treatment",
    img: "/images/service-img4.jpg",
    color: "#c9a99a",
    textColor: "#1a1a1a",
    bulletColor: "#4a2c1f",
    items: [
      "Deep moisturizing paraffin wax treatment",
      "Extended massage for hands and forearms",
      "Exfoliation scrub with natural ingredients",
      "Strengthening base coat application",
      "Aromatherapy oils for full relaxation",
    ],
  },
];

const StickyCard = memo(({
  service,
  index,
  total,
}: {
  service: (typeof services)[0];
  index: number;
  total: number;
}) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.4, 1],
    [0.94, 1, 1 - (total - index - 1) * 0.025]
  );

  const cardTop = 72 + index * 20;

  return (
    <div ref={ref} className="sticky" style={{ top: `${cardTop}px` }}>
      <motion.div
        style={{ scale }}
        className="mx-auto max-w-4xl rounded-3xl overflow-hidden shadow-2xl"
      >
        <div
          className="rounded-3xl overflow-hidden"
          style={{ backgroundColor: service.color }}
        >
          <div className="flex flex-col md:flex-row min-h-[300px] md:min-h-[320px]">

            {/* Image */}
            <div className="w-full md:w-[42%] h-[200px] md:h-auto overflow-hidden flex-shrink-0">
              <img
                src={service.img}
                alt={service.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-center">
              <p
                className="text-[11px] uppercase tracking-[0.15em] font-medium mb-2 opacity-50"
                style={{ color: service.textColor }}
              >
                {service.subtitle}
              </p>

              <h2
                className="font-serif text-[1.5rem] md:text-[1.9rem] leading-tight mb-5"
                style={{ color: service.textColor }}
              >
                {service.title}
              </h2>

              <ul className="space-y-1.5 mb-7">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-[13px] leading-snug"
                    style={{ color: service.textColor, opacity: 0.8 }}
                  >
                    <span
                      className="mt-[6px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                      style={{ backgroundColor: service.bulletColor }}
                    />
                    {item}
                  </li>
                ))}
              </ul>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="self-start text-[13px] font-medium px-6 py-2.5 rounded-full border-2 transition-colors"
                style={{
                  borderColor: service.bulletColor,
                  color: service.textColor,
                }}
              >
                Book now!
              </motion.button>
            </div>

          </div>
        </div>
      </motion.div>
    </div>
  );
});

StickyCard.displayName = "StickyCard";

export const StackedServices = memo(() => {
  return (
    <section className="bg-[#f3edeb] py-20 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-[2.2rem] sm:text-[3rem] tracking-tight text-[#1a1a1a] leading-tight">
            Our <span className="italic font-light">services</span>
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] max-w-sm mx-auto leading-relaxed">
            Scroll to explore everything we offer
          </p>
        </motion.div>

        {/* Stacked cards */}
        <div className="flex flex-col gap-4 pb-[40vh]">
          {services.map((service, i) => (
            <StickyCard
              key={service.title}
              service={service}
              index={i}
              total={services.length}
            />
          ))}
        </div>

      </div>
    </section>
  );
});

StackedServices.displayName = "StackedServices";