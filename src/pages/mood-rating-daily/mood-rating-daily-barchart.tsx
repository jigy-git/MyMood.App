import React from 'react';
import { Chart, CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { DailyMoodRating } from '../../services/rating/daily-mood-rating.type';
import { Mood } from '../../services/mood/mood.dto';
import { ColorPalette } from '../../constants';

Chart.register(CategoryScale, BarElement, Title, Tooltip, Legend, LinearScale);

type MoodDailyRatingChartProps = {
  fromDate: string;
  toDate: string;
  moods: Mood[];
  moodData: DailyMoodRating[];
};

const MoodDailyRatingChart: React.FC<MoodDailyRatingChartProps> = ({ fromDate, toDate, moods, moodData }) => {
  const getDateRange = (): string[] => {
    const start = new Date(fromDate);
    const end = new Date(toDate);
    const dates: string[] = [];

    while (start <= end) {
      dates.push(start.toISOString().split('T')[0]);
      start.setDate(start.getDate() + 1);
    }

    return dates;
  };

  const labels = getDateRange();

   const getColor = (moodId: number) => {
     return ColorPalette[moodId];
   };

  const chartData = {
    labels,
    datasets: moods.map((mood, index) => {
      const data = labels.map((date) =>
        moodData.some((entry) => entry.moodId === mood.id && entry.day === date) ? mood.id : 0
      );

      return {
        label: mood.moodName,
        data,
        backgroundColor: getColor(index),
        borderColor: getColor(index).replace('0.6', '1'),
        borderWidth: 1,
        barThickness: 12,
        categoryPercentage: 0.8,
        barPercentage: 0.9,
      };
    }),
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Mood Distribution Chart',
      },
      tooltip: {
        callbacks: {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          label: (tooltipItem: any) => {
            const date = labels[tooltipItem.dataIndex];
            const mood = moods[tooltipItem.datasetIndex];
            return `Mood: ${mood.moodName} (ID: ${mood.id}) on ${date}`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
        ticks: {
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: {
          display: true,     
          text: 'Happiness increases with score',     
        },
        beginAtZero: true,
        stacked: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (moodData.length === 0) {
    return <p>No data available for the selected dates.</p>;
  }

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default MoodDailyRatingChart;
