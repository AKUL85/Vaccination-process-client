import { ChartWrapper } from "./ChartWrapper";
import { StatsCard } from "./StatsCard";
import { TrendingUp,DollarSign,CheckCircle} from 'lucide-react';

export const SupplyTab = ({ yearlySupplyData }) => (
  <div className="space-y-8">
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold text-gray-900">Vaccine Supply Chain</h2>
      <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        Manage Supply Orders
      </button>
    </div>

    <div className="bg-white rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Yearly Vaccine Supply Trend</h3>
      <ChartWrapper type="line" data={yearlySupplyData} options={{
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { beginAtZero: true, title: { display: true, text: 'Vaccine Supply Count' } } },
      }} />
    </div>

    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatsCard icon={TrendingUp} title="Monthly Supply" value="45K" subtitle="Average monthly supply" color="blue" />
      <StatsCard icon={DollarSign} title="Supply Cost" value="৳12.5M" subtitle="This year" color="green" />
      <StatsCard icon={CheckCircle} title="Delivery Rate" value="98.2%" subtitle="On-time deliveries" color="purple" />
    </div>
  </div>
);