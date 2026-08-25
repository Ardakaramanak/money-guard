import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import css from './Chart.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CHART_COLORS = [
  '#FFD45C',
  '#F8D5CC',
  '#FF8B8B',
  '#B8A9FF',
  '#6675E8',
  '#4169E1',
  '#56D5ED',
  '#21C9A8',
  '#00B879',
];

const Chart = ({ data }) => {
  const labels = data?.labels ?? [];
  const values = data?.values ?? [];

  const total = values.reduce((sum, value) => sum + Number(value || 0), 0);

  const chartData = {
    labels,
    datasets: [
      {
        data: values,
        backgroundColor: CHART_COLORS.slice(0, values.length),
        borderColor: '#24175A',
        borderWidth: 2,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '68%',
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: context =>
            `${context.label}: ${Number(context.raw).toFixed(2)}`,
        },
      },
    },
  };

  return (
    <div className={css.chartWrapper}>
      <div className={css.chart}>
        <Doughnut data={chartData} options={options} />

        <div className={css.center}>
          <span className={css.currency}>₺</span>
          <span className={css.total}>
            {total.toLocaleString('en-US', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chart;