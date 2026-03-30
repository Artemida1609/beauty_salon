import { memo } from "react";
import { motion } from "framer-motion";

interface FooterProps {
  onBookClick?: () => void;
}

const footerLinks = {
  Services: ["Classic Manicure", "Gel Polish", "Custom Nail Art", "Spa Care"],
  Company: ["About Us", "Our Team", "Gallery", "Blog"],
  Support: ["FAQ", "Contact", "Booking Policy", "Privacy Policy"],
};

export const Footer = memo(({ onBookClick }: FooterProps) => {
  return (
    <footer className="bg-[#1a1a1a] text-white px-6 lg:px-12 pt-16 pb-8">
      <div className="max-w-6xl mx-auto">

        {/* Top row */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 pb-12 border-b border-white/10">

          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:w-[280px] flex-shrink-0"
          >
            <p className="font-semibold text-2xl tracking-tight mb-4">
              AlineaStudio
            </p>
            <p className="text-[13px] text-white/50 leading-relaxed max-w-[220px]">
              The place where your hands receive the care they deserve.
            </p>

            {/* Socials */}
            <div className="flex gap-3 mt-6">
              {["Instagram", "TikTok", "Facebook"].map((s) => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ scale: 1.1, backgroundColor: "#4a2c1f" }}
                  transition={{ duration: 0.2 }}
                  className="text-[11px] font-medium px-3 py-1.5 rounded-full border border-white/20 text-white/60"
                >
                  {s}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-8 flex-1">
            {Object.entries(footerLinks).map(([category, links], ci) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: ci * 0.1 }}
              >
                <p className="text-[11px] uppercase tracking-widest text-white/40 font-medium mb-4">
                  {category}
                </p>
                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link}>
                      <motion.a
                        href="#"
                        whileHover={{ x: 4, color: "#f3cfc2" }}
                        transition={{ duration: 0.2 }}
                        className="text-[13px] text-white/60 inline-block"
                      >
                        {link}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:w-[200px] flex-shrink-0 flex flex-col gap-3"
          >
            <p className="text-[13px] text-white/50 leading-relaxed">
              Ready to treat yourself?
            </p>
            <motion.button
              onClick={onBookClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#4a2c1f] text-white text-[13px] font-medium px-6 py-3 rounded-full text-center"
            >
              Book Appointment
            </motion.button>
            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-white/20 text-white/70 text-[13px] font-medium px-6 py-3 rounded-full text-center"
            >
              View Services
            </motion.a>
          </motion.div>

        </div>

        {/* Bottom row */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/30">
            © {new Date().getFullYear()} AlineaStudio. All rights reserved.
          </p>
          <p className="text-[12px] text-white/20">
            Crafted with care ✦
          </p>
        </div>

      </div>
    </footer>
  );
});

Footer.displayName = "Footer";