'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

// import { Sidebar } from './layout/Sidebar';
// import { OverviewTab } from './tabs/OverviewTab';
// import { RegionsTab } from './tabs/RegionsTab';
// import { SupplyTab } from './tabs/SupplyTab';
// import { AnalyticsTab } from './tabs/AnalyticsTab';
import { mockRegionsData, yearlySupplyData } from '../data/MockData';
import {
  Syringe, CheckCircle, AlertTriangle, Building,
  DollarSign, TrendingUp,
  
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend
} from 'chart.js';
import { OverviewTab } from '../component/admin/OverviewTab';
import { RegionsTab } from '../component/admin/RegionsTab';
import { SupplyTab } from '../component/admin/SupplyTab';
import { AnalyticsTab } from '../component/admin/AnalyticsTab';
import { Sidebar } from '../component/admin/Sidebar';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement,
  PointElement, ArcElement, Title, Tooltip, Legend);

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [regionsData, setRegionsData] = useState([]);

  useEffect(() => {
    setRegionsData(mockRegionsData);
  }, []);

  // Totals
  const totals = regionsData.reduce((acc, r) => {
    r.vaccine_stock.forEach(v => {
      acc.stock += v.stock;
      acc.used += v.used;
      acc.wasted += v.wasted;
    });
    acc.centers += r.total_centers;
    acc.population += r.population;
    return acc;
  }, { stock: 0, used: 0, wasted: 0, centers: 0, population: 0 });

  // Regional Comparison Data
  const regionalComparisonData = {
    labels: regionsData.map(r => r.region),
    datasets: [
      { label: 'Total Stock', data: regionsData.map(r => r.vaccine_stock.reduce((s, v) => s + v.stock, 0)), backgroundColor: 'rgba(59, 130, 246, 0.8)' },
      { label: 'Vaccines Used', data: regionsData.map(r => r.vaccine_stock.reduce((s, v) => s + v.used, 0)), backgroundColor: 'rgba(16, 185, 129, 0.8)' },
      { label: 'Vaccines Wasted', data: regionsData.map(r => r.vaccine_stock.reduce((s, v) => s + v.wasted, 0)), backgroundColor: 'rgba(239, 68, 68, 0.8)' },
    ],
  };

  const filteredRegions = selectedRegion === 'all'
    ? regionsData
    : regionsData.filter(r => r._id === selectedRegion);

  return (
    <div className="min-h-screen bg-gray-50">
     

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

          <motion.div
            className="lg:col-span-3 space-y-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ staggerChildren: 0.1 }}
          >
            {activeTab === 'overview' && (
              <OverviewTab
                totals={totals}
                regionalComparisonData={regionalComparisonData}
                regionsData={regionsData}
                selectedRegion={selectedRegion}
                setSelectedRegion={setSelectedRegion}
                filteredRegions={filteredRegions}
              />
            )}
            {activeTab === 'regions' && <RegionsTab regionsData={regionsData} />}
            {activeTab === 'supply' && <SupplyTab yearlySupplyData={yearlySupplyData} />}
            {activeTab === 'analytics' && <AnalyticsTab regionsData={regionsData} />}
          </motion.div>
        </div>
      </div>
    </div>
  );
}