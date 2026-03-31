import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "Are the services compatible with natural and acrylic nails?",
    answer:
      "Yes! All our services are adapted for both natural and acrylic nails. Our specialists will assess your nail condition before the session and recommend the best approach for lasting, beautiful results.",
  },
  {
    question: "Can I customize colors, designs, and styles?",
    answer:
      "Absolutely. We offer fully personalized consultations where you can bring inspiration photos or describe your vision. From minimalist to bold nail art — we make it yours.",
  },
  {
    question: "What happens if I can't make it to my appointment?",
    answer:
      "We understand life happens. Please cancel or reschedule at least 24 hours in advance via our booking system or by contacting us directly. Late cancellations may incur a small fee.",
  },
  {
    question: "Are the products you use safe?",
    answer:
      "We use only certified, dermatologist-tested products that are free from harmful chemicals. Your health and comfort are our top priority at every step of the service.",
  },
  {
    question: "Do I need to book an appointment, or can I walk in?",
    answer:
      "We recommend booking in advance to guarantee your preferred time slot and specialist. Walk-ins are welcome based on availability, but booking ensures the best experience.",
  },
];

const FaqItem = memo(({
  question,
  answer,
  index,
}: {
  question: string;
  answer: string;
  index: number;
}) => {
  const [open, setOpen] = useState(false);

  const toggle = useCallback(() => setOpen((prev) => !prev), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="bg-white/70 backdrop-blur-sm rounded-2xl overflow-hidden"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
      >
        <span className="text-[15px] font-medium text-[#1a1a1a] leading-snug">
          {question}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.3 }}
          className="flex-shrink-0 w-7 h-7 rounded-full border border-[#c9a99a] flex items-center justify-center"
        >
          <span className="text-[#4a2c1f] text-lg leading-none">+</span>
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-[14px] text-gray-500 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FaqItem.displayName = "FaqItem";

export const FAQ = memo(() => {
  return (
    <section id="faq" className="relative py-24 px-6 lg:px-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 50%, #e8d5d0 0%, #ede8e5 45%, #e5e0dc 100%)",
      }}
    >
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">

        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="lg:w-[320px] flex-shrink-0"
        >
          <h2 className="font-serif text-[3rem] sm:text-[3.5rem] tracking-tight text-[#1a1a1a] leading-tight">
            Questions?<br />
            <span className="italic font-light">Answers</span>
          </h2>
          <p className="mt-4 text-[14px] text-gray-500 leading-relaxed max-w-[260px]">
            We want your experience to be simple and stress-free. Here you'll
            find everything you need to know before booking your appointment.
          </p>
        </motion.div>

        {/* Right — FAQ list */}
        <div className="flex-1 flex flex-col gap-3 w-full">
          {faqs.map((faq, i) => (
            <FaqItem
              key={faq.question}
              question={faq.question}
              answer={faq.answer}
              index={i}
            />
          ))}
        </div>

      </div>
    </section>
  );
});

FAQ.displayName = "FAQ";