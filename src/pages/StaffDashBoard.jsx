'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
// import Sidebar from './components/Sidebar';
// import OverviewTab from './components/tabs/OverviewTab';
// import AppointmentsTab from './components/tabs/AppointmentsTab';
// import OcrTab from './components/tabs/OcrTab';
// import VaccineStockTab from './components/tabs/VaccineStockTab';
// import AnalyticsTab from './components/tabs/AnalyticsTab';


import Sidebar from '../component/staff/Sidebar';
import { mockCenterData,mockAppointments, vaccinationStats } from '../data/MockData';
import AppointmentsTab from '../component/staff/AppointmentsTab';
import { ChartJSRegister } from '../lib/chartConfig';
import OverviewTab from '../component/staff/OverviewTab';
import { AnalyticsTab } from '../component/admin/AnalyticsTab';
import { OcrTab } from '../component/staff/OcrTab';

// Register ChartJS components
ChartJSRegister();

const StaffDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [centerData, setCenterData] = useState(null);
  const [appointments, setAppointments] = useState([]);

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

  const renderActiveTab = () => {
    const props = { centerData, appointments, vaccinationStats };
    
    switch (activeTab) {
      case 'overview':
        return <OverviewTab {...props} />;
      case 'appointments':
        return <AppointmentsTab {...props} />;
      case 'ocr':
        return <OcrTab {...props} />;
      case 'vaccines':
        return <VaccineStockTab {...props} />;
    
      default:
        return <OverviewTab {...props} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
     
      
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar
            activeTab={activeTab} 
            setActiveTab={setActiveTab} 
            centerData={centerData} 
          />
          
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-3 space-y-8"
          >
            {renderActiveTab()}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default StaffDashboard;