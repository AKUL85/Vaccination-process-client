import React from 'react';
import { motion } from 'framer-motion';

const cardVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 70,
      duration: 0.5
    }
  }
};

const TestimonialsSection = () => (
  <motion.section
    id="testimonials"
    className="py-20 bg-blue-50"
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.3 }}
  >
    <div className="container mx-auto px-4 lg:px-8">
      <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">Trusted by Citizens & Centers</h2>
      <div className="grid md:grid-cols-3 gap-8">
        {/* Mock Testimonial 1 */}
        <motion.div variants={cardVariants} className="card bg-white shadow-xl p-8 rounded-2xl">
          <p className="text-gray-700 italic mb-4">"Booking my second dose was quick and easy. The reminder system is excellent—no more long queues!"</p>
          <div className="font-semibold text-primary">— Rashed K., Citizen</div>
        </motion.div>
        {/* Mock Testimonial 2 */}
        <motion.div variants={cardVariants} className="card bg-white shadow-xl p-8 rounded-2xl">
          <p className="text-gray-700 italic mb-4">"The stock tracking dashboard finally gives us real-time inventory control. It's drastically reduced vaccine wastage."</p>
          <div className="font-semibold text-primary">— Dr. Amina H., Center Manager</div>
        </motion.div>
        {/* Mock Testimonial 3 */}
        <motion.div variants={cardVariants} className="card bg-white shadow-xl p-8 rounded-2xl">
          <p className="text-gray-700 italic mb-4">"The digital card is foolproof. Identity verification is now instant, speeding up service delivery."</p>
          <div className="font-semibold text-primary">— Shofiq M., Citizen</div>
        </motion.div>
      </div>
    </div>
  </motion.section>
);

export default TestimonialsSection;
