import { Bar, Line, Doughnut } from 'react-chartjs-2';

export const ChartWrapper = ({ type = 'bar', data, options, height = 384 }) => {
  const ChartComponent = { bar: Bar, line: Line, doughnut: Doughnut }[type];

  return (
    <div style={{ height }}>
      <ChartComponent data={data} options={options} />
    </div>
  );
};