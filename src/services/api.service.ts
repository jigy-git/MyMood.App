// src/services/apiService.ts
import axios from 'axios';

// Create Axios instance
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Generic function to make API requests
export const apiService = {
  // This function accepts generic types for request and response
  async request<TRequest, TResponse>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PUT' | 'DELETE',
    requestData?: TRequest
  ): Promise<TResponse> {
    try {
      const response = await axiosInstance.request<TResponse>({
        url: endpoint,
        method,
        data: requestData, // For POST, PUT requests
      });
      return response.data; // Return the response data
    } catch (error) {
      console.error('API request failed:', error);
      throw error; // Propagate the error to be handled in the calling function
    }
  },
};
