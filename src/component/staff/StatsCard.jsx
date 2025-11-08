// components/shared/StatsCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
  <motion.div
    variants={{
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    }}
    className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
      </div>
      <div className={`p-3 rounded-full bg-${color}-100`}>
        <Icon className={`w-6 h-6 text-${color}-600`} />
      </div>
    </div>
  </motion.div>
);

export default StatsCard;