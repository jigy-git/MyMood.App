// src/context/MoodContext.tsx

import React, { createContext, useState, useEffect, useContext } from 'react';
import { Mood } from '../services/mood/mood.dto';
import { apiService } from '../services/api.service';

interface MoodContextType {
  availableMoods: Mood[]; // All moods available in the app
  error: string | null; // Error state
}

const MoodContext = createContext<MoodContextType | undefined>(undefined);

export const MoodProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [availableMoods, setAvailableMoods] = useState<Mood[]>([]); // Stores all available moods
  const [error, setError] = useState<string | null>(null); // Error state for API call

  // Fetch available moods only once
  useEffect(() => {
    const fetchMoods = async () => {
      try {
        const fetchedMoods = await apiService.request<object, Mood[]>('api/moods', 'GET'); 
        setAvailableMoods(fetchedMoods); // Set available moods
      } catch (err) {
        setError('Error fetching moods');
        console.error('Error fetching moods:', err); // Log error to console
      } 
    };

    fetchMoods();
  }, []);

  return (
    <MoodContext.Provider value={{ availableMoods, error }}>
      {children}
    </MoodContext.Provider>
  );
};

// Custom hook to use MoodContext
export const useMoods = (): MoodContextType => {
  const context = useContext(MoodContext);
  if (!context) {
    throw new Error('useMoods must be used within a MoodProvider');
  }
  return context;
};
