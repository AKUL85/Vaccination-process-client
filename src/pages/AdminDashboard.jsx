'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Syringe, 
  BarChart3, 
  MapPin,
  Building,
  DollarSign,
  Shield,
  Bell,
  Settings,
  LogOut,
  ChevronRight,
  Download,
  Filter,
  TrendingUp,
  AlertTriangle,
  CheckCircle
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

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regionsData, setRegionsData] = useState([]);

  // Mock regional data based on your structure
  const mockRegionsData = [
    {
      _id: "hub_dhaka",
      region: "Dhaka Division",
      total_centers: 12,
      population: 44000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 5000,
          used: 4200,
          wasted: 100,
          remaining: 700
        },
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 4500,
          used: 3800,
          wasted: 80,
          remaining: 620
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 6000,
          used: 5600,
          wasted: 90,
          remaining: 310
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 5500,
          used: 5000,
          wasted: 70,
          remaining: 430
        }
      ],
      vaccine_centers: [
        { center_id: "center_dhaka_city", name: "Dhaka Medical College" },
        { center_id: "center_gazipur", name: "Gazipur General Hospital" },
        { center_id: "center_narayanganj", name: "Narayanganj Health Complex" }
      ]
    },
    {
      _id: "hub_chattogram",
      region: "Chattogram Division",
      total_centers: 8,
      population: 33000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 3500,
          used: 2800,
          wasted: 60,
          remaining: 640
        },
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 3200,
          used: 2500,
          wasted: 45,
          remaining: 655
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 4500,
          used: 3800,
          wasted: 70,
          remaining: 630
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_rajshahi",
      region: "Rajshahi Division",
      total_centers: 6,
      population: 24000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 2800,
          used: 2200,
          wasted: 40,
          remaining: 560
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 3800,
          used: 3200,
          wasted: 55,
          remaining: 545
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_khulna",
      region: "Khulna Division",
      total_centers: 5,
      population: 21000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 2500,
          used: 1900,
          wasted: 35,
          remaining: 565
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 3200,
          used: 2700,
          wasted: 45,
          remaining: 455
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_barishal",
      region: "Barishal Division",
      total_centers: 4,
      population: 12000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 1800,
          used: 1400,
          wasted: 25,
          remaining: 375
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 2200,
          used: 1800,
          wasted: 30,
          remaining: 370
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_sylhet",
      region: "Sylhet Division",
      total_centers: 4,
      population: 15000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 2000,
          used: 1600,
          wasted: 30,
          remaining: 370
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 2500,
          used: 2100,
          wasted: 40,
          remaining: 360
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_rangpur",
      region: "Rangpur Division",
      total_centers: 5,
      population: 18000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Moderna-SPIKEVAX",
          vaccine_name: "COVID-19 Moderna",
          stock: 2200,
          used: 1800,
          wasted: 35,
          remaining: 365
        },
        {
          vaccine_id: "BCG-Vaccine",
          vaccine_name: "BCG Vaccine",
          stock: 2800,
          used: 2400,
          wasted: 45,
          remaining: 355
        }
      ],
      vaccine_centers: []
    },
    {
      _id: "hub_mymensingh",
      region: "Mymensingh Division",
      total_centers: 4,
      population: 14000000,
      vaccine_stock: [
        {
          vaccine_id: "COVID-19-Pfizer-BioNTech",
          vaccine_name: "COVID-19 Pfizer",
          stock: 1900,
          used: 1500,
          wasted: 28,
          remaining: 372
        },
        {
          vaccine_id: "Measles-Rubella-Vaccine",
          vaccine_name: "MR Vaccine",
          stock: 2300,
          used: 1900,
          wasted: 35,
          remaining: 365
        }
      ],
      vaccine_centers: []
    }
  ];

  // Mock yearly supply data
  const yearlySupplyData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    datasets: [
      {
        label: 'COVID-19 Moderna',
        data: [1200, 1500, 1800, 2200, 2500, 2800, 3200, 3500, 3800, 4200, 4500, 5000],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'COVID-19 Pfizer',
        data: [1000, 1300, 1600, 1900, 2200, 2500, 2800, 3100, 3400, 3800, 4200, 4500],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        tension: 0.4,
        fill: true,
      },
      {
        label: 'BCG Vaccine',
        data: [2000, 2500, 3000, 3500, 4000, 4500, 5000, 5200, 5500, 5800, 5900, 6000],
        borderColor: 'rgb(245, 158, 11)',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        tension: 0.4,
        fill: true,
      }
    ],
  };

  useEffect(() => {
    setRegionsData(mockRegionsData);
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

  // Calculate totals
  const getTotalStats = () => {
    const totals = {
      stock: 0,
      used: 0,
      wasted: 0,
      centers: 0,
      population: 0
    };

    regionsData.forEach(region => {
      region.vaccine_stock.forEach(vaccine => {
        totals.stock += vaccine.stock;
        totals.used += vaccine.used;
        totals.wasted += vaccine.wasted;
      });
      totals.centers += region.total_centers;
      totals.population += region.population;
    });

    return totals;
  };

  const totals = getTotalStats();

  // Prepare regional comparison data
  const getRegionalComparisonData = () => {
    const labels = regionsData.map(region => region.region);
    const usedData = regionsData.map(region => 
      region.vaccine_stock.reduce((sum, vaccine) => sum + vaccine.used, 0)
    );
    const stockData = regionsData.map(region => 
      region.vaccine_stock.reduce((sum, vaccine) => sum + vaccine.stock, 0)
    );
    const wastedData = regionsData.map(region => 
      region.vaccine_stock.reduce((sum, vaccine) => sum + vaccine.wasted, 0)
    );

    return {
      labels,
      datasets: [
        {
          label: 'Total Stock',
          data: stockData,
          backgroundColor: 'rgba(59, 130, 246, 0.8)',
        },
        {
          label: 'Vaccines Used',
          data: usedData,
          backgroundColor: 'rgba(16, 185, 129, 0.8)',
        },
        {
          label: 'Vaccines Wasted',
          data: wastedData,
          backgroundColor: 'rgba(239, 68, 68, 0.8)',
        },
      ],
    };
  };

  const regionalComparisonData = getRegionalComparisonData();

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

  const regionalChartOptions = {
    ...chartOptions,
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: 'Number of Vaccines'
        }
      },
    },
  };

  const supplyChartOptions = {
    ...chartOptions,
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Vaccine Supply Count'
        }
      }
    }
  };

  const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend }) => (
    <motion.div
      variants={itemVariants}
      className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {trend && (
            <div className={`flex items-center mt-2 text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              <TrendingUp className={`w-4 h-4 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              <span>{Math.abs(trend)}% from last month</span>
            </div>
          )}
        </div>
        <div className={`p-3 rounded-full bg-${color}-100`}>
          <Icon className={`w-6 h-6 text-${color}-600`} />
        </div>
      </div>
    </motion.div>
  );

  const RegionCard = ({ region }) => (
    <motion.div
      variants={itemVariants}
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{region.region}</h3>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
            <span className="flex items-center">
              <Building className="w-4 h-4 mr-1" />
              {region.total_centers} centers
            </span>
            <span className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {(region.population / 1000000).toFixed(1)}M people
            </span>
          </div>
        </div>
        <MapPin className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-3">
        {region.vaccine_stock.map((vaccine, index) => (
          <div key={vaccine.vaccine_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{vaccine.vaccine_name}</p>
              <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                <span>Stock: {vaccine.stock.toLocaleString()}</span>
                <span>Used: {vaccine.used.toLocaleString()}</span>
                <span>Wasted: {vaccine.wasted.toLocaleString()}</span>
              </div>
            </div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              vaccine.remaining < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
            }`}>
              {vaccine.remaining} left
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Utilization</span>
          <span className="font-semibold text-gray-900">
            {Math.round((region.vaccine_stock.reduce((sum, v) => sum + v.used, 0) / 
                         region.vaccine_stock.reduce((sum, v) => sum + v.stock, 0)) * 100)}%
          </span>
        </div>
      </div>
    </motion.div>
  );

  const filteredRegions = selectedRegion === 'all' 
    ? regionsData 
    : regionsData.filter(region => region._id === selectedRegion);

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
              <div className="p-2 rounded-full bg-purple-600">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-600">National Vaccine Management System</p>
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
                <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-medium">A</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Admin User</span>
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
              {/* Admin Info */}
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">National Admin</h2>
                <p className="text-sm text-gray-600">Vaccine Management</p>
                <p className="text-xs text-gray-500 mt-1">8 Regions • 48 Centers</p>
              </div>

              {/* Navigation */}
              <nav className="space-y-2">
                {[
                  { id: 'overview', label: 'Overview', icon: BarChart3 },
                  { id: 'regions', label: 'Regional Management', icon: MapPin },
                  { id: 'supply', label: 'Supply Chain', icon: TrendingUp },
                  { id: 'analytics', label: 'Analytics', icon: Users },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-xl transition-all duration-200 ${
                      activeTab === item.id
                        ? 'bg-purple-50 text-purple-600 border border-purple-200'
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
                {/* National Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <StatsCard
                    icon={Syringe}
                    title="Total Vaccines Stock"
                    value={totals.stock.toLocaleString()}
                    subtitle="Across all regions"
                    color="blue"
                    trend={12.5}
                  />
                  <StatsCard
                    icon={CheckCircle}
                    title="Vaccines Used"
                    value={totals.used.toLocaleString()}
                    subtitle="Administered doses"
                    color="green"
                    trend={8.3}
                  />
                  <StatsCard
                    icon={AlertTriangle}
                    title="Vaccines Wasted"
                    value={totals.wasted.toLocaleString()}
                    subtitle="Minimizing waste"
                    color="red"
                    trend={-2.1}
                  />
                  <StatsCard
                    icon={Building}
                    title="Vaccine Centers"
                    value={totals.centers}
                    subtitle="Active facilities"
                    color="purple"
                    trend={5.7}
                  />
                </div>

                {/* Regional Comparison Chart */}
                <motion.div variants={itemVariants} className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">Regional Vaccine Distribution</h3>
                    <div className="flex items-center space-x-2">
                      <Filter className="w-5 h-5 text-gray-400" />
                      <select 
                        value={selectedRegion}
                        onChange={(e) => setSelectedRegion(e.target.value)}
                        className="border border-gray-300 rounded-lg px-3 py-1 text-sm"
                      >
                        <option value="all">All Regions</option>
                        {regionsData.map(region => (
                          <option key={region._id} value={region._id}>{region.region}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="h-96">
                    <Bar data={regionalComparisonData} options={regionalChartOptions} />
                  </div>
                </motion.div>

                {/* Regional Overview Grid */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Overview</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredRegions.map((region) => (
                      <RegionCard key={region._id} region={region} />
                    ))}
                  </div>
                </motion.div>
              </>
            )}

            {/* Regional Management Tab */}
            {activeTab === 'regions' && (
              <motion.div variants={itemVariants} className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Regional Management</h2>
                  <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
                    <Download className="w-4 h-4" />
                    <span>Export Regional Data</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regionsData.map((region) => (
                    <RegionCard key={region._id} region={region} />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Supply Chain Tab */}
            {activeTab === 'supply' && (
              <motion.div variants={itemVariants} className="space-y-8">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl font-bold text-gray-900">Vaccine Supply Chain</h2>
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Manage Supply Orders
                  </button>
                </div>

                {/* Yearly Supply Chart */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <h3 className="text-lg font-semibold text-gray-900 mb-6">Yearly Vaccine Supply Trend</h3>
                  <div className="h-96">
                    <Line data={yearlySupplyData} options={supplyChartOptions} />
                  </div>
                </div>

                {/* Supply Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <StatsCard
                    icon={TrendingUp}
                    title="Monthly Supply"
                    value="45K"
                    subtitle="Average monthly supply"
                    color="blue"
                  />
                  <StatsCard
                    icon={DollarSign}
                    title="Supply Cost"
                    value="৳12.5M"
                    subtitle="This year"
                    color="green"
                  />
                  <StatsCard
                    icon={CheckCircle}
                    title="Delivery Rate"
                    value="98.2%"
                    subtitle="On-time deliveries"
                    color="purple"
                  />
                </div>
              </motion.div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
              <motion.div variants={itemVariants} className="space-y-8">
                <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Regional Performance */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
                    <div className="h-80">
                      <Doughnut 
                        data={{
                          labels: regionsData.map(r => r.region),
                          datasets: [{
                            data: regionsData.map(region => 
                              Math.round((region.vaccine_stock.reduce((sum, v) => sum + v.used, 0) / 
                                       region.vaccine_stock.reduce((sum, v) => sum + v.stock, 0)) * 100)
                            ),
                            backgroundColor: [
                              'rgba(59, 130, 246, 0.8)',
                              'rgba(16, 185, 129, 0.8)',
                              'rgba(245, 158, 11, 0.8)',
                              'rgba(139, 92, 246, 0.8)',
                              'rgba(14, 165, 233, 0.8)',
                              'rgba(236, 72, 153, 0.8)',
                              'rgba(34, 197, 94, 0.8)',
                              'rgba(249, 115, 22, 0.8)'
                            ],
                          }]
                        }} 
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

                  {/* Waste Analysis */}
                  <div className="bg-white rounded-2xl p-6 shadow-lg">
                    <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Analysis by Region</h3>
                    <div className="h-80">
                      <Bar 
                        data={{
                          labels: regionsData.map(r => r.region),
                          datasets: [{
                            label: 'Waste Percentage',
                            data: regionsData.map(region => 
                              Math.round((region.vaccine_stock.reduce((sum, v) => sum + v.wasted, 0) / 
                                       region.vaccine_stock.reduce((sum, v) => sum + v.stock, 0)) * 10000) / 100
                            ),
                            backgroundColor: 'rgba(239, 68, 68, 0.8)',
                          }]
                        }} 
                        options={chartOptions}
                      />
                    </div>
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

export default AdminDashboard;