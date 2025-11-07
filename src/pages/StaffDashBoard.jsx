'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Syringe, 
  BarChart3, 
  Upload, 
  Calendar,
  DollarSign,
  Shield,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Search,
  Filter,
  Download,
  Clock,
  CheckCircle,
  XCircle
} from 'lucide-react';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [ocrImage, setOcrImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [centerData, setCenterData] = useState(null);
  const [appointments, setAppointments] = useState([]);

  // Mock center data based on your MongoDB document
  const mockCenterData = {
    _id: "690d85ce75dc128f275c31e3",
    center_name: "Dhaka Medical College Hospital",
    location: {
      division: "Dhaka",
      district: "Dhaka",
      upazila: "Ramna",
      address: "Secretariat Road, Dhaka-1000"
    },
    contact_info: {
      phone: "+8801712345678",
      email: "dmch@health.gov.bd"
    },
    vaccines: [
      {
        vaccine_id: "COVID-19-Pfizer-Comirnaty",
        vaccine_name: "Comirnaty (Pfizer)",
        dose_volume_ml: "0.3 mL",
        total_stock: 500,
        used: 125,
        wasted: 5,
        remaining: 370,
        last_updated: "2025-11-07T09:00:00.000Z"
      },
      {
        vaccine_id: "BCG-Vaccine",
        vaccine_name: "BCG",
        dose_volume_ml: "0.1 mL",
        total_stock: 200,
        used: 45,
        wasted: 2,
        remaining: 153,
        last_updated: "2025-11-07T09:00:00.000Z"
      },
      {
        vaccine_id: "MMR-Vaccine",
        vaccine_name: "MMR",
        dose_volume_ml: "0.5 mL",
        total_stock: 300,
        used: 89,
        wasted: 3,
        remaining: 208,
        last_updated: "2025-11-07T09:00:00.000Z"
      },
      {
        vaccine_id: "HPV-Vaccine",
        vaccine_name: "HPV",
        dose_volume_ml: "0.5 mL",
        total_stock: 150,
        used: 32,
        wasted: 1,
        remaining: 117,
        last_updated: "2025-11-07T09:00:00.000Z"
      }
    ]
  };

  // Mock appointments data
  const mockAppointments = [
    {
      id: "app1",
      patientName: "John Doe",
      patientId: "P001",
      vaccineName: "Comirnaty (Pfizer)",
      appointmentDate: "2025-01-10T09:00:00.000Z",
      status: "scheduled",
      doseNumber: 1,
      totalDoses: 2,
      contact: "+8801712345678"
    },
    {
      id: "app2",
      patientName: "Sarah Smith",
      patientId: "P002",
      vaccineName: "BCG",
      appointmentDate: "2025-01-10T10:30:00.000Z",
      status: "scheduled",
      doseNumber: 1,
      totalDoses: 1,
      contact: "+8801712345679"
    },
    {
      id: "app3",
      patientName: "Michael Brown",
      patientId: "P003",
      vaccineName: "MMR",
      appointmentDate: "2025-01-11T11:00:00.000Z",
      status: "scheduled",
      doseNumber: 2,
      totalDoses: 2,
      contact: "+8801712345680"
    },
    {
      id: "app4",
      patientName: "Emma Wilson",
      patientId: "P004",
      vaccineName: "HPV",
      appointmentDate: "2025-01-11T14:00:00.000Z",
      status: "completed",
      doseNumber: 1,
      totalDoses: 2,
      contact: "+8801712345681"
    },
    {
      id: "app5",
      patientName: "David Johnson",
      patientId: "P005",
      vaccineName: "Comirnaty (Pfizer)",
      appointmentDate: "2025-01-12T15:30:00.000Z",
      status: "cancelled",
      doseNumber: 2,
      totalDoses: 2,
      contact: "+8801712345682"
    }
  ];

  // Mock vaccination statistics data
  const vaccinationStats = {
    weekly: [45, 52, 38, 61, 55, 48, 67],
    monthly: [1200, 1350, 1100, 1250, 1400, 1300, 1450, 1500, 1350, 1400, 1550, 1600],
    byType: {
      'COVID-19': 1250,
      'BCG': 890,
      'MMR': 760,
      'HPV': 450,
      'Influenza': 680,
      'Hepatitis B': 520
    },
    monthlyCosts: {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      data: [12500, 13800, 14200, 15600, 14800, 16200, 17500, 16800, 15800, 17200, 18500, 19200]
    }
  };

  useEffect(() => {
    setCenterData(mockCenterData);
    setAppointments(mockAppointments);
  }, []);

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

  // Chart configurations
  const vaccineTypeChart = {
    labels: Object.keys(vaccinationStats.byType),
    datasets: [
      {
        label: 'Vaccinations Administered',
        data: Object.values(vaccinationStats.byType),
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(16, 185, 129, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(14, 165, 233, 0.8)',
          'rgba(236, 72, 153, 0.8)'
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(14, 165, 233)',
          'rgb(236, 72, 153)'
        ],
        borderWidth: 2,
      },
    ],
  };

  const frequencyChart = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Vaccinations Per Week',
        data: vaccinationStats.weekly,
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const costChart = {
    labels: vaccinationStats.monthlyCosts.labels,
    datasets: [
      {
        label: 'Monthly Maintenance Cost (BDT)',
        data: vaccinationStats.monthlyCosts.data,
        backgroundColor: 'rgba(16, 185, 129, 0.8)',
        borderColor: 'rgb(16, 185, 129)',
        borderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const frequencyChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vaccinations Count'
        }
      },
      x: {
        title: {
          display: true,
          text: 'Days of Week'
        }
      }
    }
  };

  const costChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Cost (BDT)'
        }
      }
    }
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

  const VaccineStockCard = ({ vaccine }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{vaccine.vaccine_name}</h3>
          <p className="text-sm text-gray-600">Dose: {vaccine.dose_volume_ml}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">{vaccine.remaining}</p>
          <p className="text-sm text-gray-500">in stock</p>
        </div>
      </div>
      
      <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
        <div 
          className="bg-green-500 h-2 rounded-full transition-all duration-500"
          style={{ 
            width: `${(vaccine.remaining / vaccine.total_stock) * 100}%` 
          }}
        ></div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center">
          <p className="text-gray-500">Total</p>
          <p className="font-semibold text-gray-900">{vaccine.total_stock}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Used</p>
          <p className="font-semibold text-green-600">{vaccine.used}</p>
        </div>
        <div className="text-center">
          <p className="text-gray-500">Wasted</p>
          <p className="font-semibold text-red-600">{vaccine.wasted}</p>
        </div>
      </div>
      
      <p className="text-xs text-gray-500 mt-4 text-center">
        Last updated: {new Date(vaccine.last_updated).toLocaleDateString()}
      </p>
    </motion.div>
  );

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
        variants={itemVariants}
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

  const handleOcrUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsProcessing(true);
      setOcrImage(URL.createObjectURL(file));
      
      // Simulate OCR processing
      setTimeout(() => {
        setIsProcessing(false);
        // Mock OCR result
        alert('Vaccination card processed successfully!\n\nExtracted Information:\n- Name: John Doe\n- Vaccine: COVID-19 Pfizer\n- Dose: 1/2\n- Date: 2024-01-07\n- Center: Dhaka Medical College');
      }, 2000);
    }
  };

  const todayAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate).toDateString() === new Date().toDateString()
  );

  const upcomingAppointments = appointments.filter(apt => 
    new Date(apt.appointmentDate) > new Date() && apt.status === 'scheduled'
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
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Staff Dashboard</h1>
                <p className="text-sm text-gray-600">{centerData?.center_name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
              <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                <Settings className="w-5 h-5 text-gray-600" />
              </button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                  <Users className="w-4 h-4 text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Staff User</span>
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
              {/* Center Info */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">{centerData?.center_name}</h2>
                <p className="text-sm text-gray-600">{centerData?.location.district}, {centerData?.location.division}</p>
                <p className="text-xs text-gray-500 mt-1">{centerData?.contact_info.phone}</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'appointments', label: 'Appointments', icon: Calendar },
                  { id: 'ocr', label: 'OCR Scanner', icon: Upload },
                  { id: 'vaccines', label: 'Vaccine Stock', icon: Syringe },
                  { id: 'analytics', label: 'Analytics', icon: Users },
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
                <motion.div variants={itemVariants}>
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
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Vaccinations by Type</h3>
                      <Filter className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-80">
                      <Bar data={vaccineTypeChart} options={chartOptions} />
                    </div>
                  </motion.div>

                  {/* Weekly Frequency Chart */}
                  <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-lg font-semibold text-gray-900">Weekly Vaccination Frequency</h3>
                      <Download className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="h-80">
                      <Line data={frequencyChart} options={frequencyChartOptions} />
                    </div>
                  </motion.div>
                </div>

                {/* Monthly Cost Chart */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Monthly Maintenance Costs</h3>
                    <DollarSign className="w-5 h-5 text-gray-400" />
                  </div>
                  <div className="h-80">
                    <Bar data={costChart} options={costChartOptions} />
                  </div>
                </motion.div>
              </>
            )}

            {/* Appointments Tab */}
            {activeTab === 'appointments' && (
              <motion.div variants={itemVariants} className="space-y-6">
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
                  <button
                    className={`pb-4 px-2 font-medium ${
                      activeTab === 'appointments' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500'
                    }`}
                  >
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
            )}

            {/* OCR Scanner Tab */}
            {activeTab === 'ocr' && (
              <motion.div variants={itemVariants} className="bg-white rounded-2xl p-8 shadow-lg">
                <div className="text-center mb-8">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Upload className="w-10 h-10 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Vaccination Card OCR Scanner</h2>
                  <p className="text-gray-600 max-w-2xl mx-auto">
                    Upload a photo of a vaccination card to automatically extract and record vaccination information
                  </p>
                </div>

                <div className="max-w-2xl mx-auto">
                  <div className="border-2 border-dashed border-gray-300 rounded-2xl p-8 text-center hover:border-blue-400 transition-colors duration-300">
                    {ocrImage ? (
                      <div className="space-y-4">
                        <img 
                          src={ocrImage} 
                          alt="Uploaded vaccination card" 
                          className="max-w-full h-64 object-contain mx-auto rounded-lg"
                        />
                        {isProcessing ? (
                          <div className="text-blue-600">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
                            <p>Processing vaccination card...</p>
                          </div>
                        ) : (
                          <div className="space-y-3">
                            <p className="text-green-600 font-semibold">✓ Card processed successfully</p>
                            <button 
                              onClick={() => setOcrImage(null)}
                              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                              Scan Another Card
                            </button>
                          </div>
                        )}
                      </div>
                    ) : (
                      <>
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-4">Upload vaccination card image</p>
                        <label className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors cursor-pointer">
                          Choose File
                          <input 
                            type="file" 
                            className="hidden" 
                            accept="image/*"
                            onChange={handleOcrUpload}
                          />
                        </label>
                        <p className="text-sm text-gray-500 mt-4">Supports: JPG, PNG, PDF</p>
                      </>
                    )}
                  </div>

                  {/* OCR Instructions */}
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm font-bold">1</span>
                      </div>
                      <p className="text-sm font-medium">Take clear photo</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm font-bold">2</span>
                      </div>
                      <p className="text-sm font-medium">Upload image</p>
                    </div>
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-white text-sm font-bold">3</span>
                      </div>
                      <p className="text-sm font-medium">Auto-extract data</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Vaccine Stock Tab */}
            {activeTab === 'vaccines' && (
              <motion.div variants={itemVariants}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">Vaccine Stock Management</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Report</span>
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {centerData?.vaccines.map((vaccine, index) => (
                    <VaccineStockCard key={vaccine.vaccine_id} vaccine={vaccine} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Vaccine Type Distribution */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Vaccine Distribution</h3>
                    <div className="h-64">
                      <Doughnut 
                        data={vaccineTypeChart} 
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'bottom'
                            }
                          }
                        }} 
                      />
                    </div>
                  </div>

                  {/* Monthly Trends */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Vaccination Trends</h3>
                    <div className="h-64">
                      <Line 
                        data={{
                          labels: vaccinationStats.monthlyCosts.labels,
                          datasets: [{
                            label: 'Monthly Vaccinations',
                            data: vaccinationStats.monthly,
                            borderColor: 'rgb(139, 92, 246)',
                            backgroundColor: 'rgba(139, 92, 246, 0.1)',
                            tension: 0.4,
                            fill: true,
                          }]
                        }} 
                        options={chartOptions}
                      />
                    </div>
                  </div>
                </div>

                {/* Cost Analysis */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Cost Analysis & Projections</h3>
                  <div className="h-80">
                    <Bar data={costChart} options={costChartOptions} />
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;