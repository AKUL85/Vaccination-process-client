// components/tabs/AppointmentsTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import AppointmentCard from './AppointmentCard';


const AppointmentsTab = ({ appointments }) => {
  return (
    <motion.div variants={{
      hidden: { y: 20, opacity: 0 },
      visible: {
        y: 0,
        opacity: 1,
        transition: { duration: 0.5, ease: "easeOut" }
      }
    }} className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Appointment Management</h2>
        <div className="flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            New Appointment
          </button>
          <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export Schedule</span>
          </button>
        </div>
      </div>

      {/* Appointment Tabs */}
      <div className="flex space-x-4 border-b border-gray-200">
        <button className="pb-4 px-2 font-medium text-blue-600 border-b-2 border-blue-600">
          All Appointments ({appointments.length})
        </button>
      </div>

      {/* Appointments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {appointments.map((appointment) => (
          <AppointmentCard key={appointment.id} appointment={appointment} />
        ))}
      </div>
    </motion.div>
  );
};

export default AppointmentsTab;