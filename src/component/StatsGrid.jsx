import React from "react";
import { motion } from "framer-motion";
import { Syringe, Calendar, Clock } from "lucide-react";

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue" }) => (
  <motion.div
    variants={itemVariants}
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

const StatsGrid = ({ user, nextVaccine, upcomingAppointments }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    <StatsCard
      icon={Syringe}
      title="Vaccinations Taken"
      value={user.vaccinations.length}
      subtitle="Total doses administered"
      color="green"
    />
    <StatsCard
      icon={Calendar}
      title="Next Vaccination"
      value={nextVaccine ? `${nextVaccine.daysRemaining} days` : "No upcoming"}
      subtitle={
        nextVaccine ? nextVaccine.vaccineName : "Schedule your next dose"
      }
      color="blue"
    />
    <StatsCard
      icon={Clock}
      title="Upcoming Appointments"
      value={upcomingAppointments.length}
      subtitle="Scheduled visits"
      color="purple"
    />
  </div>
);

export default StatsGrid;
