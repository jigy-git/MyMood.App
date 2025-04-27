// src/services/MoodService.ts
import { apiService } from './../api.service';
import { MoodSubmissionRequest } from './mood-submission.request';
import { MoodSubmissionResponse } from './mood-submission.response';
import { Mood } from './mood.dto';

// Function to fetch all moods
export const MoodService = {
  async getAllMoods(): Promise<Mood[]> {
    try {
      const response = await apiService.request<null, Mood[]>('api/moods', 'GET');
      return response;
    } catch (error) {
      console.error('Error fetching moods:', error);
      throw error;
    }
  },

  async submitMood(userId: number, moodId: number, comment: string) {
    const requestData = { userId, moodId, comment };
    try {
      const response = await apiService.request<MoodSubmissionRequest, MoodSubmissionResponse>(
        'api/usermood',
        'POST',
        requestData
      );
      return response;
    } catch (error) {
      console.error('Error submitting mood:', error);
      throw error;
    }
  }
};
