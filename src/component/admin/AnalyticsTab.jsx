import { ChartWrapper } from "./ChartWrapper";


export const AnalyticsTab = ({ regionsData }) => {
  const performanceData = {
    labels: regionsData.map(r => r.region),
    datasets: [{
      data: regionsData.map(r => {
        const stock = r.vaccine_stock.reduce((s, v) => s + v.stock, 0);
        const used = r.vaccine_stock.reduce((s, v) => s + v.used, 0);
        return stock ? Math.round((used / stock) * 100) : 0;
      }),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)', 'rgba(16, 185, 129, 0.8)', 'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)', 'rgba(14, 165, 233, 0.8)', 'rgba(236, 72, 153, 0.8)',
        'rgba(34, 197, 94, 0.8)', 'rgba(249, 115, 22, 0.8)'
      ],
    }]
  };

  const wasteData = {
    labels: regionsData.map(r => r.region),
    datasets: [{
      label: 'Waste %',
      data: regionsData.map(r => {
        const stock = r.vaccine_stock.reduce((s, v) => s + v.stock, 0);
        const wasted = r.vaccine_stock.reduce((s, v) => s + v.wasted, 0);
        return stock ? Math.round((wasted / stock) * 10000) / 100 : 0;
      }),
      backgroundColor: 'rgba(239, 68, 68, 0.8)',
    }]
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900">Advanced Analytics</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Regional Performance</h3>
          <ChartWrapper type="doughnut" data={performanceData} options={{
            responsive: true,
            plugins: { legend: { position: 'bottom' } }
          }} height={320} />
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Waste Analysis by Region</h3>
          <ChartWrapper type="bar" data={wasteData} options={{
            responsive: true,
            plugins: { legend: { position: 'top' } },
            scales: { y: { beginAtZero: true } }
          }} height={320} />
        </div>
      </div>
    </div>
  );
};