import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#f3edeb] pt-[96px]">

      {/* Background */}
      <div className="absolute inset-0 bg-[#f3edeb]" />

      <div
        className="absolute inset-0"
        style={{
          background: "radial-gradient(circle at 75% 40%, #fceae2 0%, #f3edeb 60%)",
        }}
      />

      {/* Blur circle 1 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.5, scale: 1 }}
        transition={{ duration: 1.6 }}
        className="
        absolute
        w-[350px] h-[350px]
        lg:w-[400px] lg:h-[400px]
        bg-[#f3cfc2]
        rounded-full
        blur-[100px]
        top-[65%]
        left-1/2
        -translate-x-1/2
        lg:left-auto lg:right-[25%]
        "
      />

      {/* Blur circle 2 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 2 }}
        className="
        absolute
        w-[420px] h-[420px]
        lg:w-[600px] lg:h-[600px]
        rounded-full
        blur-[120px]
        top-[50%]
        left-1/2
        -translate-x-1/2
        lg:left-auto lg:right-[15%]
        "
        style={{ background: "#f8dcd2" }}
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-12 flex flex-col lg:grid lg:grid-cols-2 gap-12 items-center relative z-10 w-full">

        {/* TEXT SIDE */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.18 }
            }
          }}
          className="flex flex-col justify-center pt-8 pb-6 lg:py-0"
        >

          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7 }}
            className="
            text-[2.6rem]
            sm:text-[3rem]
            lg:text-[5.5rem]
            leading-[0.95]
            font-serif
            tracking-tight
            text-[#1a1a1a]
            "
          >
            The confidence<br />
            that changes<br />
            your <span className="italic font-light">mood.</span>
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7 }}
            className="
            mt-6
            text-[16px]
            lg:text-[19px]
            text-gray-600
            max-w-md
            leading-relaxed
            "
          >
            The place where your hands receive the care they deserve — where every color,
            every shape, and every detail are designed to reflect your style.
          </motion.p>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: { opacity: 1, y: 0 }
            }}
            transition={{ duration: 0.7 }}
            className="flex flex-wrap gap-4 mt-10"
          >

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
              bg-[var(--color-dark-hover)]
              text-white
              px-8 py-4
              border-2 border-transparent
              rounded-full
              text-base
              font-medium
              "
            >
              Book your Appointment
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="
              border-2 border-[var(--color-dark-hover)]
              px-8 py-4
              rounded-full
              text-base
              font-medium
              "
            >
              Discover our services
            </motion.button>

          </motion.div>

        </motion.div>

        {/* IMAGE SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 80 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="
          relative
          flex
          justify-center
          lg:justify-end
          w-full
          mt-6
          lg:mt-0
          "
        >

          <div className="relative w-full max-w-[420px] sm:max-w-[480px] lg:max-w-[650px] mx-auto">

            <motion.img
              src="/images/hero-img.png"
              alt="Manicure hands"
              className="w-full h-auto block object-contain"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.4 }}
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.8) 85%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 70%, rgba(0,0,0,0.8) 85%, transparent 100%)"
              }}
            />

          </div>

        </motion.div>

      </div>

    </section>
  );
};