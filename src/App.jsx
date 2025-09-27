import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './layout/Layout.jsx'
import Dashboard from './pages/Dashboard.jsx'
import TeacherDashboard from './pages/TeacherDashboard.jsx'
import TeacherChat from './pages/TeacherChat.jsx'
import StudentChat from './pages/StudentChat.jsx'
import WorksheetGenerator from './pages/WorksheetGenerator.jsx'
import TestGenerator from './pages/TestGenerator.jsx'
import QuizGenerator from './pages/QuizGenerator.jsx'
import LessonPlanner from './pages/LessonPlanner.jsx'
import AiGrader from './pages/AiGrader.jsx'
import MyMaterials from './pages/MyMaterials.jsx'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
        <Route path="/teacher-chat" element={<TeacherChat />} />
        <Route path="/student-chat" element={<StudentChat />} />
        <Route path="/worksheet-generator" element={<WorksheetGenerator />} />
        <Route path="/test-generator" element={<TestGenerator />} />
        <Route path="/quiz-generator" element={<QuizGenerator />} />
        <Route path="/lesson-planner" element={<LessonPlanner />} />
        <Route path="/ai-grader" element={<AiGrader />} />
        <Route path="/my-materials" element={<MyMaterials />} />
      </Routes>
    </Router>
  )
}

export default App