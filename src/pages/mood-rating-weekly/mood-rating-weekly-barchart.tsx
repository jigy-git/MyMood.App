/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import './mood-rating-weekly.css';
import { WeeklyMoodRating } from '../../services/rating/weekly-mood-rating.type';
import { Mood } from '../../services/mood/mood.dto';
import { ColorPalette } from '../../constants';

Chart.register(CategoryScale, BarElement, LinearScale, Tooltip, Legend, Title);

type WeeklyMoodBarChartProps = {
  fromDate: string;
  toDate: string;
  moods: Mood[];
  moodData: WeeklyMoodRating[];
};

const WeeklyMoodBarChart: React.FC<WeeklyMoodBarChartProps> = ({ fromDate, toDate, moods, moodData }) => {
  // Color map from moodId
  const getColor = (moodId: number) => {
    return ColorPalette[moodId];
  };

  const labels = moodData.map(
    (entry) => `${entry.startDayOfWeek} - ${entry.lastDayOfWeek}`
  );

  // Create a dataset per mood
  const datasets = moods.map((mood, i) => {
    const data = labels.map((label) => {
      const entry = moodData.find(
        (e) => `${e.startDayOfWeek} - ${e.lastDayOfWeek}` === label && e.moodId === mood.id
      );
      return entry ? mood.id : 0;
    });

    return {
      label: mood.moodName,
      data,
      backgroundColor: getColor(i),
      borderColor: getColor(i).replace('0.6', '1'),
      borderWidth: 1,
    };
  });

  const chartData = {
    labels,
    datasets,
  };


  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: `Weekly Mood Rating (${fromDate} to ${toDate})`,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            return `${context.dataset.label} was dominant`;
          },
        },
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Week Range',
        },
      },
      y: {
        title: {
          display: false,
          text: 'Mood Presence',
        },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  if (moodData.length === 0) {
    return <p>No mood data for the selected range.</p>;
  }

  return (
    <div className="chart-container">
      <Bar data={chartData} options={options} />
    </div>
  );
};

export default WeeklyMoodBarChart;
