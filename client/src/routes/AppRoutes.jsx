import { Routes, Route } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'

import Dashboard from '../pages/dashboard/Dashboard'
import Timetable from '../pages/timetable/Timetable'
import Attendance from '../pages/attendance/Attendance'
import Analytics from '../pages/analytics/Analytics'
import Predictor from '../pages/predictor/Predictor'
import SafeBunk from '../pages/safebunk/SafeBunk'
import CalendarPage from '../pages/calendar/CalendarPage'
import Profile from '../pages/profile/Profile'
import Settings from '../pages/settings/Settings'

import Login from '../pages/auth/Login'

import ProtectedRoute from '../components/auth/ProtectedRoute'

function AppRoutes() {
  return (
    <Routes>
      {/* Login */}
      <Route
        path='/login'
        element={<Login />}
      />

      {/* Protected App */}
      <Route
        path='/'
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={<Dashboard />}
        />

        <Route
          path='dashboard'
          element={<Dashboard />}
        />

        <Route
          path='timetable'
          element={<Timetable />}
        />

        <Route
          path='attendance'
          element={<Attendance />}
        />

        <Route
          path='analytics'
          element={<Analytics />}
        />

        <Route
          path='predictor'
          element={<Predictor />}
        />

        <Route
          path='safe-bunk'
          element={<SafeBunk />}
        />

        <Route
          path='calendar'
          element={<CalendarPage />}
        />

        <Route
          path='profile'
          element={<Profile />}
        />

        <Route
          path='settings'
          element={<Settings />}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes