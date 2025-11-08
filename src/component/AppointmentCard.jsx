import React from "react";
import { motion } from "framer-motion";
import { Calendar } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const AppointmentCard = ({ appointment }) => (
  <motion.div
    variants={itemVariants}
    className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
  >
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center space-x-3">
        <div className="p-2 rounded-full bg-blue-100">
          <Calendar className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {appointment.vaccineName}
          </h3>
          <p className="text-sm text-gray-600">{appointment.center}</p>
        </div>
      </div>
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full ${
          appointment.status === "scheduled"
            ? "bg-blue-100 text-blue-800"
            : "bg-yellow-100 text-yellow-800"
        }`}
      >
        {appointment.status === "scheduled" ? "Confirmed" : "Pending"}
      </span>
    </div>

    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-gray-500">Scheduled Date</p>
        <p className="font-medium text-gray-900">
          {new Date(appointment.date).toLocaleDateString()} at{" "}
          {new Date(appointment.date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
      </div>
      <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
        Reschedule
      </button>
    </div>
  </motion.div>
);

export default AppointmentCard;
