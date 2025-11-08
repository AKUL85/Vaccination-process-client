import { motion } from 'framer-motion';
import { Building, Users, MapPin } from 'lucide-react';

export const RegionCard = ({ region }) => {
  const totalStock = region.vaccine_stock.reduce((s, v) => s + v.stock, 0);
  const totalUsed = region.vaccine_stock.reduce((s, v) => s + v.used, 0);
  const utilization = totalStock ? Math.round((totalUsed / totalStock) * 100) : 0;

  return (
    <motion.div
      className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
      whileHover={{ y: -4 }}
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
              {(region.population / 1_000_000).toFixed(1)}M people
            </span>
          </div>
        </div>
        <MapPin className="w-5 h-5 text-blue-600" />
      </div>

      <div className="space-y-3">
        {region.vaccine_stock.map((v) => (
          <div key={v.vaccine_id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex-1">
              <p className="font-medium text-gray-900 text-sm">{v.vaccine_name}</p>
              <div className="flex space-x-4 text-xs text-gray-600 mt-1">
                <span>Stock: {v.stock.toLocaleString()}</span>
                <span>Used: {v.used.toLocaleString()}</span>
                <span>Wasted: {v.wasted.toLocaleString()}</span>
              </div>
            </div>
            <div
              className={`px-2 py-1 rounded-full text-xs font-medium ${
                v.remaining < 100 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'
              }`}
            >
              {v.remaining} left
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Total Utilization</span>
          <span className="font-semibold text-gray-900">{utilization}%</span>
        </div>
      </div>
    </motion.div>
  );
};