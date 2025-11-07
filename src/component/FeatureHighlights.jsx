'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { User, CalendarCheck, MapPin, BarChart2 } from 'lucide-react';

const featureData = [
  {
    icon: User,
    title: "Secure Registration",
    description: "Verify your identity and create a digital vaccine record, eliminating manual errors and data mismatch issues.",
    gradient: "from-emerald-400 to-teal-500",
    glow: "shadow-emerald-500/50",
  },
  {
    icon: CalendarCheck,
    title: "Dynamic Appointment Booking",
    description: "Effortlessly book, reschedule, and receive automated reminders for your vaccination slots, reducing queues and wait times.",
    gradient: "from-amber-400 to-orange-500",
    glow: "shadow-amber-500/50",
  },
  {
    icon: MapPin,
    title: "Center & Stock Visibility",
    description: "View real-time vaccine stock levels and locations, ensuring availability before you travel to a center.",
    gradient: "from-cyan-400 to-sky-500",
    glow: "shadow-cyan-500/50",
  },
  {
    icon: BarChart2,
    title: "AI-Powered Wastage Tracking",
    description: "Authorities gain predictive insights and real-time alerts to monitor vaccine movement and minimize wastage.",
    gradient: "from-purple-400 to-pink-500",
    glow: "shadow-purple-500/50",
  },
];

// Staggered container
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.12 },
  },
};

// Smooth spring entrance (slower, premium feel)
const cardVariants = {
  hidden: { y: 70, opacity: 0, scale: 0.92 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 22,
      mass: 1,
      duration: 0.8, // Slower entrance
    },
  },
};

// Hover: Lift + glow + icon scale (NO REPEAT)
const hoverEffects = {
  y: -10,
  transition: {
    type: "spring",
    stiffness: 300,
    damping: 25,
  },
};

const iconHover = {
  scale: 1.2,
  transition: { duration: 0.5, ease: "easeOut" },
};

export default function FeatureHighlights() {
  return (
    <motion.section
      id="features"
      className="py-24 bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={container}
    >
      <div className="container mx-auto px-4 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-600 mb-4"
        >
          Core System Features
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="text-lg md:text-xl text-slate-600 mb-16 max-w-3xl mx-auto"
        >
          Solving the key challenges of record mismatch, queuing, and stock visibility in one seamless platform.
        </motion.p>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-7">
          {featureData.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={hoverEffects}
              className="group relative h-full"
            >
              {/* Glass Card */}
              <div className="relative p-1 rounded-2xl h-full">
                {/* Glowing Border (Blurred Gradient) */}
                <div
                  className={`
                    absolute inset-0 rounded-2xl 
                    bg-gradient-to-br ${feature.gradient} 
                    opacity-0 group-hover:opacity-100 
                    transition-opacity duration-700 ease-out 
                    blur-xl ${feature.glow}
                  `}
                ></div>

                {/* Card Body */}
                <div
                  className={`
                    relative h-full min-h-[280px]
                    bg-white/90 backdrop-blur-xl
                    border border-slate-200/50
                    rounded-2xl p-7
                    shadow-lg
                    transition-all duration-700 ease-out
                    group-hover:shadow-2xl
                    group-hover:border-transparent
                    flex flex-col justify-between
                  `}
                >
                  {/* Icon with smooth scale-in on hover */}
                  <motion.div
                    className="mb-5 flex justify-center"
                    whileHover={iconHover}
                  >
                    <div className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg`}>
                      <feature.icon className="w-8 h-8 text-white" strokeWidth={2.5} />
                    </div>
                  </motion.div>

                  {/* Text */}
                  <div className="flex flex-col flex-grow">
                    <h3 className="text-xl font-bold text-slate-800 mb-3">
                      {feature.title}
                    </h3>
                    <p className="text-sm md:text-base text-slate-600 leading-relaxed flex-grow">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}