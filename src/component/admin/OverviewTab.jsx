import { motion } from 'framer-motion';

import { AlertTriangle, Building, CheckCircle, Filter, Syringe } from 'lucide-react';
import { StatsCard } from './StatsCard';
import { ChartWrapper } from './ChartWrapper';
import { RegionCard } from './RegionCard';

export const OverviewTab = ({
  totals,
  regionalComparisonData,
  regionsData,
  selectedRegion,
  setSelectedRegion,
  filteredRegions,
}) => (
  <>
    {/* National Stats */}
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatsCard icon={Syringe} title="Total Vaccines Stock" value={totals.stock.toLocaleString()} subtitle="Across all regions" color="blue" trend={12.5} />
      <StatsCard icon={CheckCircle} title="Vaccines Used" value={totals.used.toLocaleString()} subtitle="Administered doses" color="green" trend={8.3} />
      <StatsCard icon={AlertTriangle} title="Vaccines Wasted" value={totals.wasted.toLocaleString()} subtitle="Minimizing waste" color="red" trend={-2.1} />
      <StatsCard icon={Building} title="Vaccine Centers" value={totals.centers} subtitle="Active facilities" color="purple" trend={5.7} />
    </div>

    {/* Regional Comparison Chart */}
    <motion.div className="bg-white rounded-2xl p-6 shadow-lg">
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
            {regionsData.map((r) => (
              <option key={r._id} value={r._id}>{r.region}</option>
            ))}
          </select>
        </div>
      </div>
      <ChartWrapper type="bar" data={regionalComparisonData} options={{
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { x: { stacked: true }, y: { stacked: true, beginAtZero: true, title: { display: true, text: 'Number of Vaccines' } } },
      }} />
    </motion.div>

    {/* Regional Cards */}
    <motion.div>
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Overview</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRegions.map((r) => (
          <RegionCard key={r._id} region={r} />
        ))}
      </div>
    </motion.div>
  </>
);