import React from "react";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const VaccinationCard = ({ vaccination }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-green-100">
          <CheckCircle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {vaccination.vaccineName}
          </h3>
          <p className="text-sm text-gray-600">{vaccination.centre}</p>
        </div>
      </div>
      <span className="px-3 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
        Completed
      </span>
    </div>

    <div className="grid grid-cols-2 gap-4 text-sm">
      <div>
        <p className="text-gray-500">Date</p>
        <p className="font-medium text-gray-900">
          {new Date(vaccination.dateAdministered).toLocaleDateString()}
        </p>
      </div>
      <div>
        <p className="text-gray-500">Dose</p>
        <p className="font-medium text-gray-900">{vaccination.doseTaken}</p>
      </div>
      <div>
        <p className="text-gray-500">Batch No.</p>
        <p className="font-medium text-gray-900">{vaccination.batchNumber}</p>
      </div>
      <div>
        <p className="text-gray-500">Status</p>
        <p className="font-medium text-green-600 capitalize">
          {vaccination.status}
        </p>
      </div>
    </div>
  </motion.div>
);

export default VaccinationCard;
