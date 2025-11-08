import { Download } from 'lucide-react';
import { RegionCard } from './RegionCard';


export const RegionsTab = ({ regionsData }) => (
  <div className="space-y-6">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Regional Management</h2>
      <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
        <Download className="w-4 h-4" />
        <span>Export Regional Data</span>
      </button>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {regionsData.map((r) => (
        <RegionCard key={r._id} region={r} />
      ))}
    </div>
  </div>
);