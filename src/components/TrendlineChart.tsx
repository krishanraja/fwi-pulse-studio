import { useEffect, useRef } from 'react';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

interface TrendlineChartProps {
  data: {
    months: string[];
    overall: number[];
    demand: number[];
    supply: number[];
    culture: number[];
  };
}

const TrendlineChart = ({ data }: TrendlineChartProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    chartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: data.months.map(month => {
          const date = new Date(month + '-01');
          return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
        }),
        datasets: [
          {
            label: 'Overall FWI',
            data: data.overall,
            borderColor: '#6C40FF',
            backgroundColor: '#6C40FF20',
            borderWidth: 3,
            fill: true,
            tension: 0.4,
            pointBackgroundColor: '#6C40FF',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 2,
            pointRadius: 6,
            pointHoverRadius: 8,
          },
          {
            label: 'Demand',
            data: data.demand,
            borderColor: '#3B82F6',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#3B82F6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderDash: [2, 2]
          },
          {
            label: 'Supply',
            data: data.supply,
            borderColor: '#8B5CF6',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#8B5CF6',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderDash: [5, 5]
          },
          {
            label: 'Culture',
            data: data.culture,
            borderColor: '#10B981',
            backgroundColor: 'transparent',
            borderWidth: 2,
            fill: false,
            tension: 0.4,
            pointBackgroundColor: '#10B981',
            pointBorderColor: '#FFFFFF',
            pointBorderWidth: 1,
            pointRadius: 4,
            pointHoverRadius: 6,
            borderDash: [10, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: true,
            position: 'bottom',
            labels: {
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle',
              font: {
                size: 12,
                family: 'Inter'
              }
            }
          },
          tooltip: {
            backgroundColor: 'rgba(255, 255, 255, 0.95)',
            titleColor: '#000',
            bodyColor: '#000',
            borderColor: '#E5E7EB',
            borderWidth: 1,
            cornerRadius: 8,
            caretPadding: 8,
            displayColors: true,
            callbacks: {
              title: (context) => {
                const monthIndex = context[0].dataIndex;
                const date = new Date(data.months[monthIndex] + '-01');
                return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
              },
              label: (context) => `${context.dataset.label}: ${context.parsed.y}`
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: true,
              color: '#F3F4F6'
            },
            ticks: {
              font: {
                size: 12,
                family: 'Inter'
              }
            }
          },
          y: {
            grid: {
              display: true,
              color: '#F3F4F6'
            },
            ticks: {
              font: {
                size: 12,
                family: 'Inter'
              }
            },
            beginAtZero: false,
            min: 35,
            max: 85
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [data]);

  return (
    <div className="h-80">
      <canvas ref={canvasRef} />
    </div>
  );
};

export default TrendlineChart;