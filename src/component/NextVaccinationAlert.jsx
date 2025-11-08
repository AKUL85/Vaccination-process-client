import React from "react";
import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const NextVaccinationAlert = ({ nextVaccine }) => (
  <motion.div
    variants={itemVariants}
    className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white"
  >
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-4">
        <AlertCircle className="w-8 h-8" />
        <div>
          <h3 className="text-lg font-semibold">Next Vaccination Due</h3>
          <p className="text-blue-100">
            {nextVaccine.vaccineName} in {nextVaccine.daysRemaining} days
          </p>
          <p className="text-sm text-blue-200 mt-1">
            Scheduled for {new Date(nextVaccine.nextDate).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button className="px-6 py-2 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors">
        Schedule Now
      </button>
    </div>
  </motion.div>
);

export default NextVaccinationAlert;
