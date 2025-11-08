// components/shared/VaccineStockCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const VaccineStockCard = ({ vaccine }) => (
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

export default VaccineStockCard;