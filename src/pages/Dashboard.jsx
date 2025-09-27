import React from "react";

export default function Dashboard() {
  const handleTeacherClick = () => {
    console.log("Teacher button clicked!"); // Debug line
    window.location.href = '/teacher-dashboard';
  };

  const handleStudentClick = () => {
    console.log("Student button clicked!"); // Debug line
    window.location.href = '/student-chat';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">EduAI Assistant</h1>
        <p className="text-xl text-gray-600 mb-8">AI-Powered Educational Assistant</p>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-20 h-20 bg-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">👨‍🏫</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Teacher Portal</h2>
            <p className="text-gray-600 mb-8">Access AI tools for curriculum and assessment</p>
            <button 
              onClick={handleTeacherClick}
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition"
            >
              Enter Teacher Portal →
            </button>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg">
            <div className="w-20 h-20 bg-green-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <span className="text-white text-2xl">📚</span>
            </div>
            <h2 className="text-2xl font-bold mb-4">Student Mode</h2>
            <p className="text-gray-600 mb-8">Get personalized tutoring and homework help</p>
            <button 
              onClick={handleStudentClick}
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition"
            >
              Start Learning Session →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}