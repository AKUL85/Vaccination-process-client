'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Calendar, 
  Syringe, 
  Clock, 
  Shield,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { currentUser, mockVaccines } from '../data/MockData';

const UserDashboard = () => {
  const [user, setUser] = useState(currentUser);
  const [activeTab, setActiveTab] = useState('overview');
  const [nextVaccine, setNextVaccine] = useState(null);

  useEffect(() => {
    // Calculate next vaccine date (mock logic)
    if (user.vaccinations && user.vaccinations.length > 0) {
      const lastVaccination = user.vaccinations[user.vaccinations.length - 1];
      const lastDate = new Date(lastVaccination.dateAdministered);
      const nextDate = new Date(lastDate);
      nextDate.setMonth(nextDate.getMonth() + 6); // Next dose in 6 months
      
      setNextVaccine({
        vaccineName: lastVaccination.vaccineName,
        nextDate: nextDate.toISOString(),
        daysRemaining: Math.ceil((nextDate - new Date()) / (1000 * 60 * 60 * 24))
      });
    }
  }, [user]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const getUpcomingAppointments = () => {
    // Mock upcoming appointments
    return [
      {
        id: 1,
        vaccineName: "COVID-19 Booster",
        date: "2025-01-15T10:00:00.000Z",
        center: "City Medical Center",
        status: "scheduled"
      },
      {
        id: 2,
        vaccineName: "Annual Flu Shot",
        date: "2025-03-20T14:30:00.000Z",
        center: "Community Health Clinic",
        status: "pending"
      }
    ];
  };

  const getVaccineRecommendations = () => {
    const takenVaccineIds = user.vaccinations.map(v => v.vaccineId);
    return mockVaccines.filter(vaccine => !takenVaccineIds.includes(vaccine.id));
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
            <h3 className="font-semibold text-gray-900">{vaccination.vaccineName}</h3>
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
          <p className="font-medium text-green-600 capitalize">{vaccination.status}</p>
        </div>
      </div>
    </motion.div>
  );

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
            <h3 className="font-semibold text-gray-900">{appointment.vaccineName}</h3>
            <p className="text-sm text-gray-600">{appointment.center}</p>
          </div>
        </div>
        <span className={`px-3 py-1 text-xs font-medium rounded-full ${
          appointment.status === 'scheduled' 
            ? 'bg-blue-100 text-blue-800' 
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {appointment.status === 'scheduled' ? 'Confirmed' : 'Pending'}
        </span>
      </div>
      
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Scheduled Date</p>
          <p className="font-medium text-gray-900">
            {new Date(appointment.date).toLocaleDateString()} at {' '}
            {new Date(appointment.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
        <button className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors">
          Reschedule
        </button>
      </div>
    </motion.div>
  );

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
          <span className="text-green-600 font-medium">{vaccine.efficacy} efficacy</span>
        </div>
        <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition-colors">
          Schedule
        </button>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white shadow-sm border-b border-gray-200"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-full bg-blue-600">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-gray-900">VaxTrack Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <span className="text-sm font-medium text-gray-700">{user.name}</span>
              </div>
            </div>
          </div>
        </div>
      </motion.header>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-8">
              {/* User Profile Summary */}
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white text-xl font-bold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{user.name}</h2>
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-500 mt-1">Age: {user.age} years</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: User },
                  { id: 'vaccinations', label: 'My Vaccinations', icon: Syringe },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'recommendations', label: 'Recommendations', icon: Shield },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-blue-50 text-blue-600 border border-blue-200'
                        : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.label}</span>
                    </div>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ))}
              </nav>

              {/* Logout Button */}
              <button className="w-full flex items-center space-x-3 p-3 text-gray-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 mt-8">
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Log Out</span>
              </button>
            </div>
          </motion.div>

          {/* Main Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 space-y-8"
          >
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <>
                {/* Stats Grid */}
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
                    subtitle={nextVaccine ? nextVaccine.vaccineName : "Schedule your next dose"}
                    color="blue"
                  />
                  <StatsCard
                    icon={Clock}
                    title="Upcoming Appointments"
                    value={getUpcomingAppointments().length}
                    subtitle="Scheduled visits"
                    color="purple"
                  />
                </div>

                {/* Next Vaccination Alert */}
                {nextVaccine && (
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
                )}

                {/* Recent Vaccinations */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Recent Vaccinations</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {user.vaccinations.slice(-2).map((vaccination, index) => (
                      <VaccinationCard key={index} vaccination={vaccination} />
                    ))}
                  </div>
                </motion.div>

                {/* Upcoming Appointments */}
                <motion.div variants={itemVariants}>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Upcoming Appointments</h2>
                  <div className="grid grid-cols-1 gap-6">
                    {getUpcomingAppointments().map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Vaccinations Tab */}
            {activeTab === 'vaccinations' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Vaccination History</h2>
                <div className="grid grid-cols-1 gap-6">
                  {user.vaccinations.map((vaccination, index) => (
                    <VaccinationCard key={index} vaccination={vaccination} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">My Appointments</h2>
                <div className="grid grid-cols-1 gap-6">
                  {getUpcomingAppointments().map((appointment) => (
                    <AppointmentCard key={appointment.id} appointment={appointment} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Recommendations Tab */}
            {activeTab === 'recommendations' && (
              <motion.div variants={itemVariants}>
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Recommended Vaccines</h2>
                <div className="grid grid-cols-1 gap-6">
                  {getVaccineRecommendations().map((vaccine) => (
                    <RecommendationCard key={vaccine.id} vaccine={vaccine} />
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;