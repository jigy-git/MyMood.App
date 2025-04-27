import React, { useState } from 'react';
import { Container, Button, Form, Row } from 'react-bootstrap';
import { MoodRatingService } from '../../services/rating/mood-rating.service';
import DateRangePicker from '../../components/date-range-picker/date-range-picker';
import { DailyMoodRating } from '../../services/rating/daily-mood-rating.type';
import MoodDailyRatingChart from './mood-rating-daily-barchart';
import { useMoods } from '../../contexts/mood.context';

const DailyMoodRatingDashboard: React.FC = () => {
  const [fromDate, setFromDate] = useState('2025-04-01');
  const [toDate, setToDate] = useState('2025-04-30');
  const [error, setError] = useState<string>('');
  const [moodData, setMoodData] = useState<DailyMoodRating[]>([]);

  const { availableMoods } = useMoods();
  const fetchMoodData = async () => {
    if (!fromDate || !toDate) {
      setError('Please select both From Date and To Date');
      return;
    }

    try {
      setError('');
      const response = await MoodRatingService.getDailyMoodRating(fromDate, toDate);
      setMoodData(response);
    } catch (err) {
      console.error('Error fetching mood data:', err);
      setError('Error fetching mood data. Please try again.');
    }
  };

  return (
    <Container fluid className="pt-3">
      <div className="mb-4">
        <h4 className="mt-4">Daily Average Mood Rating</h4>
        <p><em>View daily mood ratings for the selected date range</em></p>
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
        <MoodDailyRatingChart
          fromDate={fromDate}
          toDate={toDate}
          moods={availableMoods}
          moodData={moodData}
        />
      )}      
    </Container>
  );
};

export default DailyMoodRatingDashboard;
