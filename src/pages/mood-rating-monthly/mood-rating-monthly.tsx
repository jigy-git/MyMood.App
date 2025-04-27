import React, { useState } from 'react';
import { Container, Button, Form, Row } from 'react-bootstrap';
import { useMoods } from '../../contexts/mood.context';
import { MoodRatingService } from '../../services/rating/mood-rating.service';
import DateRangePicker from '../../components/date-range-picker/date-range-picker';
import { MonthlyMoodRating } from '../../services/rating/monthly-mood-rating.type.';
import MonthlyMoodBarChart from './mood-rating-monthly-barchart';

const MonthlyMoodRatingDashboard: React.FC = () => {
  const [fromDate, setFromDate] = useState('2025-01-01');
  const [toDate, setToDate] = useState('2025-04-30');
  const [error, setError] = useState<string>('');
  const [moodData, setMoodData] = useState<MonthlyMoodRating[]>([]);

  const { availableMoods } = useMoods();

  const fetchMoodData = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both From Date and To Date');
      return;
    }

    try {
      setError('');
      const response = await MoodRatingService.getMonthlyMoodRating(fromDate, toDate);
      setMoodData(response);
    } catch (err) {
      console.error('Error fetching mood data:', err);
      setError('Error fetching mood data. Please try again.');
    }
  };

  return (
    <Container fluid className="pt-3">
      <div className="mb-4">
        <h4 className="mt-4">Monthly Average Mood Rating</h4>
        <p><em>View monthly average mood rating for the selected date range</em></p>
      </div>

      <Form className="mt-4 pb-4 d-flex gap-3 flex-wrap">
        <Row>
        <DateRangePicker
          fromDate={fromDate}
          toDate={toDate}
          onFromDateChange={setFromDate}
          onToDateChange={setToDate}
        />
        <Button className='w-25 m-2' onClick={fetchMoodData}>Show</Button>
        </Row>
       
      </Form>

      {error && <div style={{ color: 'red', marginBottom: '20px' }}>{error}</div>}

      {/* Bar Chart */}
      {moodData.length > 0 && (
       <MonthlyMoodBarChart
          fromDate={fromDate}
          toDate={toDate}
          moods={availableMoods}
          moodData={moodData}
        />
      )}      
    </Container>
  );
};

export default MonthlyMoodRatingDashboard;
