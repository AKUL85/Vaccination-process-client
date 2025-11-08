import { motion } from 'framer-motion';
import { TrendingUp } from 'lucide-react';

export const StatsCard = ({ icon: Icon, title, value, subtitle, color = "blue", trend }) => (
  <motion.div
    className={`bg-white rounded-2xl p-6 shadow-lg border-l-4 border-${color}-500 hover:shadow-xl transition-all duration-300`}
    whileHover={{ scale: 1.02 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
        {trend !== undefined && (
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