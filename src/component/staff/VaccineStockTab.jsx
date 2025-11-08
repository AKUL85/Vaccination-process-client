// components/tabs/VaccineStockTab.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import VaccineStockCard from './VaccineStockCard';


const VaccineStockTab = ({ centerData }) => {
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
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Vaccine Stock Management</h2>
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2">
          <Download className="w-4 h-4" />
          <span>Export Report</span>
        </button>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Vaccine Types</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{centerData?.vaccines.length || 0}</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100">
              <Download className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Available Doses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {centerData?.vaccines.reduce((sum, v) => sum + v.remaining, 0) || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-green-100">
              <Download className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl p-6 shadow-lg border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Wasted Doses</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {centerData?.vaccines.reduce((sum, v) => sum + v.wasted, 0) || 0}
              </p>
            </div>
            <div className="p-3 rounded-full bg-purple-100">
              <Download className="w-6 h-6 text-purple-600" />
            </div>
          </div>
        </div>
      </div>
      
      {/* Vaccine Stock Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {centerData?.vaccines.map((vaccine) => (
          <VaccineStockCard key={vaccine.vaccine_id} vaccine={vaccine} />
        ))}
      </div>

      {/* Low Stock Alert */}
      {centerData?.vaccines.some(v => v.remaining / v.total_stock < 0.2) && (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-6 bg-red-50 border border-red-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-bold">!</span>
            </div>
            <div>
              <h3 className="font-semibold text-red-800">Low Stock Alert</h3>
              <p className="text-red-700 text-sm">
                Some vaccines are running low. Consider reordering soon.
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default VaccineStockTab;