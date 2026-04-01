import { memo, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const services = [
  "Classic Manicure",
  "Gel Polish Nails",
  "Custom Nail Art",
  "Spa & Deep Care",
  "Nail Extensions",
  "Polish Change",
];

const timeSlots = [
  "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
  "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM",
];

interface BookingFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal = memo(({ isOpen, onClose }: BookingFormProps) => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "",
    date: "",
    time: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset after showing success
    setTimeout(() => {
      setIsSuccess(false);
      setFormData({
        name: "",
        phone: "",
        email: "",
        service: "",
        date: "",
        time: "",
        notes: "",
      });
      onClose();
    }, 2000);
  }, [formData, onClose]);

  const handleChange = useCallback((field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#4a2c1f] to-[#6b3d2f] p-6 text-white">
              <h2 className="font-serif text-2xl">Book Your Appointment</h2>
              <p className="text-white/70 text-sm mt-1">
                Fill in the details and we&apos;ll confirm your booking
              </p>
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>
            </div>

            {/* Success State */}
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-8 text-center"
              >
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <span className="text-3xl text-green-600">✓</span>
                </div>
                <h3 className="text-xl font-medium text-[#1a1a1a] mb-2">Booking Confirmed!</h3>
                <p className="text-gray-500">
                  We&apos;ll send you a confirmation message shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="space-y-4">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>

                  {/* Phone & Email */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all"
                        placeholder="+1 (___) ___-____"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Service *
                    </label>
                    <select
                      required
                      value={formData.service}
                      onChange={(e) => handleChange("service", e.target.value)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {services.map((service) => (
                        <option key={service} value={service}>
                          {service}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Date & Time */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => handleChange("date", e.target.value)}
                        min={new Date().toISOString().split("T")[0]}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Time *
                      </label>
                      <select
                        required
                        value={formData.time}
                        onChange={(e) => handleChange("time", e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all bg-white"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map((time) => (
                          <option key={time} value={time}>
                            {time}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Special Requests
                    </label>
                    <textarea
                      value={formData.notes}
                      onChange={(e) => handleChange("notes", e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#4a2c1f] focus:ring-2 focus:ring-[#4a2c1f]/20 outline-none transition-all resize-none"
                      placeholder="Any special requests or preferences..."
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="w-full mt-6 bg-[#4a2c1f] text-white py-4 rounded-xl font-medium text-base hover:bg-[#3a2218] transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                      />
                      Processing...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
});

BookingModal.displayName = "BookingModal";
