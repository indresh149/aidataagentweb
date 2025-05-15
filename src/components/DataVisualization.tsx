import React from 'react';
import { Bar, Line, Pie, Doughnut, Scatter } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import DataTable from './DataTable';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

interface DataVisualizationProps {
  type: 'chart' | 'table';
  title: string;
  data: any;
}

const DataVisualization: React.FC<DataVisualizationProps> = ({ type, title, data }) => {
  // Function to render the appropriate chart based on the chart type
  const renderChart = () => {
    const { chartType, chartData, chartOptions } = data;
    
    // Apply consistent styling and theming
    const options = {
      responsive: true,
      maintainAspectRatio: false,
      ...chartOptions,
      plugins: {
        ...chartOptions?.plugins,
        legend: {
          position: 'top' as const,
          ...chartOptions?.plugins?.legend,
        },
        title: {
          display: true,
          text: title,
          ...chartOptions?.plugins?.title,
        },
      },
    };

    switch (chartType) {
      case 'bar':
        return <Bar data={chartData} options={options} />;
      case 'line':
        return <Line data={chartData} options={options} />;
      case 'pie':
        return <Pie data={chartData} options={options} />;
      case 'doughnut':
        return <Doughnut data={chartData} options={options} />;
      case 'scatter':
        return <Scatter data={chartData} options={options} />;
      default:
        return <div className="text-red-500">Unsupported chart type: {chartType}</div>;
    }
  };

  return (
    <div className="rounded-lg shadow-md p-4 bg-white dark:bg-gray-800 overflow-hidden">
      {type === 'chart' ? (
        <div className="h-64 md:h-80">
          {renderChart()}
        </div>
      ) : (
        <div>
          <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-white">{title}</h3>
          <DataTable columns={data.columns} rows={data.rows} />
        </div>
      )}
    </div>
  );
};

export default DataVisualization;