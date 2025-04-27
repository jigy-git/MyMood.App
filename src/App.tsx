import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/home'
import About from './pages/about/about'
import './App.css'
import Login from './pages/login/login'
import { AuthProvider } from './contexts/auth.context'
import MoodSubmission from  './pages/mood-submission/mood-submission'
import CustomNavbar from './components/navbar/navbar'
import { MoodProvider } from './contexts/mood.context'
import DailyMoodRatingDashboard from './pages/mood-rating-daily/mood-rating-daily'
import WeeklyMoodRatingDashboard from './pages/mood-rating-weekly/mood-rating-weekly'
import MonthlyMoodRatingDashboard from './pages/mood-rating-monthly/mood-rating-monthly'

function App() { 
  return (
    <>
    <AuthProvider>
    <CustomNavbar  />  
    <MoodProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/moodEntry" element={<MoodSubmission />} />
        <Route path="/dailyMoodRating" element={<DailyMoodRatingDashboard />} />
        <Route path="/weeklyMoodRating" element={<WeeklyMoodRatingDashboard />} />
        <Route path="/monthlyMoodRating" element={<MonthlyMoodRatingDashboard />} />
      </Routes>
    </MoodProvider>   
    </AuthProvider>
    </>
  )
}

export default App
