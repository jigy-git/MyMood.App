import { apiService } from './../api.service';
import { DailyMoodRating } from './daily-mood-rating.type';
import { MonthlyMoodRating } from './monthly-mood-rating.type.';
import { WeeklyMoodRating } from './weekly-mood-rating.type';

export const MoodRatingService = {   
    getDailyMoodRating: async (fromDate: string, toDate: string): Promise<DailyMoodRating[]> => {
      try {
        const response = await apiService.request<{ fromDate: string; toDate: string }, DailyMoodRating[]>(
          'api/moodRating/daily', 
          'POST',
          { fromDate, toDate } 
        );
        return response;
      } catch (error) {
        console.error('Error fetching mood data:', error);
        throw new Error('Failed to fetch mood data');
      }
    },
    getWeeklyMoodRating: async (fromDate: string, toDate: string): Promise<WeeklyMoodRating[]> => {
      try {
        const response = await apiService.request<{ fromDate: string; toDate: string }, WeeklyMoodRating[]>(
          'api/moodRating/weekly',
          'POST',
          { fromDate, toDate } 
        );
        return response;
      } catch (error) {
        console.error('Error fetching weekly mood data:', error);
        throw new Error('Failed to fetch weekly mood data');
      }
    },
    getMonthlyMoodRating: async (fromDate: string, toDate: string): Promise<MonthlyMoodRating[]> => {
      try {
        const response = await apiService.request<{ fromDate: string; toDate: string }, MonthlyMoodRating[]>(
          'api/moodRating/monthly',
          'POST',
          { fromDate, toDate } 
        );
        return response;
      } catch (error) {
        console.error('Error fetching monthly mood data:', error);
        throw new Error('Failed to fetch monthly mood data');
      }
    }
  };


