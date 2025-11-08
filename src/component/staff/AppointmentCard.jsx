// components/shared/AppointmentCard.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle } from 'lucide-react';

const AppointmentCard = ({ appointment }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'cancelled':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'scheduled':
        return <Clock className="w-4 h-4" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4" />;
      case 'cancelled':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <motion.div
      variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{appointment.patientName}</h3>
          <p className="text-sm text-gray-600">ID: {appointment.patientId}</p>
        </div>
        <div className={`flex items-center space-x-2 px-3 py-1 rounded-full border ${getStatusColor(appointment.status)}`}>
          {getStatusIcon(appointment.status)}
          <span className="text-sm font-medium capitalize">{appointment.status}</span>
        </div>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Vaccine:</span>
          <span className="font-medium text-gray-900">{appointment.vaccineName}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Dose:</span>
          <span className="font-medium text-gray-900">
            {appointment.doseNumber}/{appointment.totalDoses}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Appointment Date:</span>
          <span className="font-medium text-gray-900">
            {new Date(appointment.appointmentDate).toLocaleDateString()}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Time:</span>
          <span className="font-medium text-gray-900">
            {new Date(appointment.appointmentDate).toLocaleTimeString([], { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Contact:</span>
          <span className="font-medium text-gray-900">{appointment.contact}</span>
        </div>
      </div>

      <div className="flex space-x-2">
        {appointment.status === 'scheduled' && (
          <>
            <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
              Mark Complete
            </button>
            <button className="flex-1 bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
              Cancel
            </button>
          </>
        )}
        {appointment.status === 'completed' && (
          <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
            View Details
          </button>
        )}
        {appointment.status === 'cancelled' && (
          <button className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium">
            Reschedule
          </button>
        )}
      </div>
    </motion.div>
  );
};

export default AppointmentCard;