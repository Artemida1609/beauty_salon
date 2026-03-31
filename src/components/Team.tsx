import { memo } from "react";
import { motion } from "framer-motion";
import { useLazyImage } from "../hooks/useImagePreload";

const teamMembers = [
  {
    id: 1,
    name: "Anna Petrova",
    role: "Lead Nail Artist",
    experience: "8 years",
    specialty: "Custom Nail Art",
    image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=500&fit=crop",
  },
  {
    id: 2,
    name: "Maria Silva",
    role: "Senior Technician",
    experience: "6 years",
    specialty: "Gel & Acrylic",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
  },
  {
    id: 3,
    name: "Sophie Chen",
    role: "Spa Specialist",
    experience: "5 years",
    specialty: "Luxury Treatments",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
  },
  {
    id: 4,
    name: "Elena Rossi",
    role: "Nail Designer",
    experience: "4 years",
    specialty: "3D Nail Art",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
  },
];

const TeamCard = memo(({ member, index }: { member: typeof teamMembers[0]; index: number }) => {
  const { imgRef, src: lazySrc } = useLazyImage(member.image, {
    threshold: 0.2,
    rootMargin: "50px",
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div className="relative overflow-hidden rounded-2xl bg-[#f3edeb]">
        <div
          ref={imgRef}
          className="aspect-[4/5] overflow-hidden"
        >
          {lazySrc ? (
            <motion.img
              src={lazySrc}
              alt={member.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              whileHover={{ scale: 1.05 }}
            />
          ) : (
            <div className="w-full h-full animate-pulse bg-[#e8ddd9]" />
          )}
        </div>
        
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <p className="text-sm opacity-80">{member.experience} experience</p>
            <p className="text-sm opacity-80">Specialty: {member.specialty}</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <h3 className="font-medium text-[#1a1a1a] text-lg">{member.name}</h3>
        <p className="text-sm text-gray-500">{member.role}</p>
      </div>
    </motion.div>
  );
});

TeamCard.displayName = "TeamCard";

export const Team = memo(() => {
  return (
    <section id="team" className="bg-[#f3edeb] py-24 px-6 lg:px-12">
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
            Meet our <span className="italic font-light">team</span>
          </h2>
          <p className="mt-3 text-gray-500 text-[15px] max-w-md mx-auto leading-relaxed">
            Our skilled professionals are dedicated to making you look and feel your best
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamCard key={member.id} member={member} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
});

Team.displayName = "Team";
