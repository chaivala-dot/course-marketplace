import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

// Pages
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'
import Dashboard from './pages/Dashboard'
import Success from './pages/Success'

// Additional pages (kept from previous structure)
import CoursesPage from './pages/CoursesPage'
import InstructorDashboard from './pages/InstructorDashboard'

import './App.css'

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/course/:id" element={<CoursePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/instructor" element={<InstructorDashboard />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </Router>
  )
}
