// components/Sidebar.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Calendar, 
  Upload, 
  Syringe, 
  Users, 
  LogOut, 
  ChevronRight,
  Shield 
} from 'lucide-react';

const Sidebar = ({ activeTab, setActiveTab, centerData }) => {
  const menuItems = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'ocr', label: 'OCR Scanner', icon: Upload },
    { id: 'vaccines', label: 'Vaccine Stock', icon: Syringe },
    
  ];

  return (
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
          {menuItems.map((item) => (
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
  );
};

export default Sidebar;