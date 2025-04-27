/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, BarElement, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import './mood-rating-monthly.css';
import { Mood } from '../../services/mood/mood.dto';
import { ColorPalette } from '../../constants';
import { MonthlyMoodRating } from '../../services/rating/monthly-mood-rating.type.';

Chart.register(CategoryScale, BarElement, LinearScale, Tooltip, Legend, Title);

type MonthlyMoodBarChartProps = {
  fromDate: string;
  toDate: string;
  moods: Mood[];
  moodData: MonthlyMoodRating[];
};

const MonthlyMoodBarChart: React.FC<MonthlyMoodBarChartProps> = ({ fromDate, toDate, moods, moodData }) => {

  const getColor = (moodId: number) => {
    return ColorPalette[moodId];
  };

  const [labels, setLabels] = useState<string[]>([]); 
  const getMonthLabels = (): string[] => {
    const labels: string[] = [];
    const from = new Date(fromDate);
    const to = new Date(toDate);
  
    // Set day to 1 to avoid edge cases
    from.setDate(1);
    to.setDate(1);
  
    const current = new Date(from);
  
    while (current.getFullYear() < to.getFullYear() ||
    (current.getFullYear() == to.getFullYear() && current.getMonth() <= to.getMonth())) {
      const month = current.getMonth() + 1; // getMonth is 0-based
      const year = current.getFullYear();
      labels.push(`${month}/${year}`);
  
      // Move to the next month
      current.setMonth(current.getMonth() + 1);
    }
  
    return labels;
  };
  
  useEffect(() => {
    setLabels(getMonthLabels());
  }, [])

  // Create a dataset per mood
  const datasets = moods.map((mood, i) => {
    const data = labels.map((label) => {
      const entry = moodData.find(
        (e: MonthlyMoodRating) => `${e.month}/${e.year}` == label && e.moodId == mood.id
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
        text: `Monthly Mood Ratings (${fromDate} to ${toDate})`,
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
          text: 'Month Range',
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

export default MonthlyMoodBarChart;
