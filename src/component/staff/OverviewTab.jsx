// components/tabs/OverviewTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

import { Users, Syringe, DollarSign } from 'lucide-react';
import { Bar, Line } from 'react-chartjs-2';

import StatsCard from './StatsCard';
import AppointmentCard from './AppointmentCard';
import { vaccineTypeChart, frequencyChart, costChart, chartOptions, frequencyChartOptions, costChartOptions } from '../../lib/chartConfig';

const OverviewTab = ({ centerData, appointments, vaccinationStats }) => {
  const todayAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
  );

  return (
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          icon={Users}
          title="Total Vaccinations"
          value="4,850"
          subtitle="This month"
          color="blue"
        />
        <StatsCard
          icon={Syringe}
          title="Vaccine Stock"
          value={centerData?.vaccines.reduce((sum, v) => sum + v.remaining, 0) || 0}
          subtitle="Available doses"
          color="green"
        />
        <StatsCard
          icon={DollarSign}
          title="Monthly Cost"
          value="৳18,500"
          subtitle="Maintenance"
          color="purple"
        />
        <StatsCard
          icon={Calendar}
          title="Today's Appointments"
          value={todayAppointments.length}
          subtitle="Scheduled"
          color="orange"
        />
      </div>

      {/* Today's Appointments */}
      <motion.div variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }}>
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Today's Appointments</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {todayAppointments.slice(0, 4).map((appointment) => (
            <AppointmentCard key={appointment.id} appointment={appointment} />
          ))}
        </div>
        {todayAppointments.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No appointments scheduled for today</p>
          </div>
        )}
      </motion.div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Vaccine Type Chart */}
        <motion.div variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
          }
        }} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Vaccinations by Type</h3>
          </div>
          <div className="h-80">
            <Bar data={vaccineTypeChart} options={chartOptions} />
          </div>
        </motion.div>

        {/* Weekly Frequency Chart */}
        <motion.div variants={{
          hidden: { y: 20, opacity: 0 },
          visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" }
          }
        }} className="bg-white rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Weekly Vaccination Frequency</h3>
          </div>
          <div className="h-80">
            <Line data={frequencyChart} options={frequencyChartOptions} />
          </div>
        </motion.div>
      </div>

      {/* Monthly Cost Chart */}
      <motion.div variants={{
        hidden: { y: 20, opacity: 0 },
        visible: {
          y: 0,
          opacity: 1,
          transition: { duration: 0.5, ease: "easeOut" }
        }
      }} className="bg-white rounded-2xl p-6 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Monthly Maintenance Costs</h3>
        </div>
        <div className="h-80">
          <Bar data={costChart} options={costChartOptions} />
        </div>
      </motion.div>
    </>
  );
};

export default OverviewTab;