import { motion } from "framer-motion";

export const Header = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="absolute top-0 left-0 w-full h-[96px] z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">

        <motion.div
          whileHover={{ scale: 1.05 }}
          className="font-semibold text-2xl tracking-tight text-[#1a1a1a]"
        >
          AlineaStudio
        </motion.div>

        <div className="hidden md:flex items-center gap-10 text-sm font-medium text-[var(--color-gray)]">
          <a href="#" className="hover:text-[var(--color-accent-dark)] transition-colors">Home</a>
          <a href="#" className="hover:text-[var(--color-accent-dark)] transition-colors">About</a>
          <a href="#" className="hover:text-[var(--color-accent-dark)] transition-colors">Services</a>
        </div>

        <motion.button
          whileHover={{ scale: 1.07 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#4a2c1f] text-white px-7 py-2.5 rounded-full text-sm font-medium hover:bg-[#3a2218]"
        >
          Contact
        </motion.button>

      </div>
    </motion.header>
  );
};