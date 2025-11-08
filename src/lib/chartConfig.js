// utils/chartConfig.js
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

export const ChartJSRegister = () => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    LineElement,
    PointElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );
};

// Mock data for charts
const vaccinationStats = {
  weekly: [45, 52, 38, 61, 55, 48, 67],
  monthly: [1200, 1350, 1100, 1250, 1400, 1300, 1450, 1500, 1350, 1400, 1550, 1600],
  byType: {
    'COVID-19': 1250,
    'BCG': 890,
    'MMR': 760,
    'HPV': 450,
    'Influenza': 680,
    'Hepatitis B': 520
  },
  monthlyCosts: {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    data: [12500, 13800, 14200, 15600, 14800, 16200, 17500, 16800, 15800, 17200, 18500, 19200]
  }
};

export const vaccineTypeChart = {
  labels: Object.keys(vaccinationStats.byType),
  datasets: [
    {
      label: 'Vaccinations Administered',
      data: Object.values(vaccinationStats.byType),
      backgroundColor: [
        'rgba(59, 130, 246, 0.8)',
        'rgba(16, 185, 129, 0.8)',
        'rgba(245, 158, 11, 0.8)',
        'rgba(139, 92, 246, 0.8)',
        'rgba(14, 165, 233, 0.8)',
        'rgba(236, 72, 153, 0.8)'
      ],
      borderColor: [
        'rgb(59, 130, 246)',
        'rgb(16, 185, 129)',
        'rgb(245, 158, 11)',
        'rgb(139, 92, 246)',
        'rgb(14, 165, 233)',
        'rgb(236, 72, 153)'
      ],
      borderWidth: 2,
    },
  ],
};

export const frequencyChart = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  datasets: [
    {
      label: 'Vaccinations Per Week',
      data: vaccinationStats.weekly,
      borderColor: 'rgb(59, 130, 246)',
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      tension: 0.4,
      fill: true,
    },
  ],
};

export const costChart = {
  labels: vaccinationStats.monthlyCosts.labels,
  datasets: [
    {
      label: 'Monthly Maintenance Cost (BDT)',
      data: vaccinationStats.monthlyCosts.data,
      backgroundColor: 'rgba(16, 185, 129, 0.8)',
      borderColor: 'rgb(16, 185, 129)',
      borderWidth: 2,
    },
  ],
};

export const chartOptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
};

export const frequencyChartOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Vaccinations Count'
      }
    },
    x: {
      title: {
        display: true,
        text: 'Days of Week'
      }
    }
  }
};

export const costChartOptions = {
  ...chartOptions,
  scales: {
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Cost (BDT)'
      }
    }
  }
};