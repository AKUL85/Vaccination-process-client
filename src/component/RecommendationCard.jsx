import React from "react";
import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const RecommendationCard = ({ vaccine }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-purple-100">
          <Shield className="w-5 h-5 text-purple-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">{vaccine.name}</h3>
          <p className="text-sm text-gray-600">{vaccine.manufacturer}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
        Recommended
      </span>
    </div>

    <p className="text-sm text-gray-600 mb-4">{vaccine.description}</p>

    <div className="flex items-center justify-between">
      <div className="flex space-x-4 text-sm">
        <span className="text-gray-500">{vaccine.dosesRequired} doses</span>
        <span className="text-gray-500">{vaccine.ageEligibility}</span>
        <span className="text-green-600 font-medium">
          {vaccine.efficacy} efficacy
        </span>
      </div>
      <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
        Schedule
      </button>
    </div>
  </motion.div>
);

export default RecommendationCard;
