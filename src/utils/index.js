export const createPageUrl = (pageName) => {
  const pageMap = {
    'Dashboard': '/',
    'TeacherDashboard': '/teacher-dashboard',
    'TeacherChat': '/teacher-chat',
    'StudentChat': '/student-chat',
    'WorksheetGenerator': '/worksheet-generator',
    'TestGenerator': '/test-generator', 
    'QuizGenerator': '/quiz-generator',
    'LessonPlanner': '/lesson-planner',
    'AiGrader': '/ai-grader',
    'MyMaterials': '/my-materials'
  };
  
  return pageMap[pageName] || '/';
};