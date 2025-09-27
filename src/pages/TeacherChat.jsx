import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

export default function TeacherChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);

  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: 1,
      role: "assistant",
      content: "Hello! I'm your AI teaching assistant. I'm here to help you with lesson planning, curriculum development, assessment creation, grading rubrics, educational resources, and any other teaching-related tasks. How can I assist you today?",
      timestamp: new Date().toISOString()
    }]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const generateTeacherResponse = (userMessage) => {
    const responses = [
      "I'd be happy to help you with that. Let me provide some research-based suggestions...",
      "That's an important pedagogical consideration. Here's how I would approach it...",
      "This is a common challenge in education. Based on best practices, I recommend...",
      "Let me help you develop a structured approach to this...",
      "I can provide some evidence-based strategies for this situation...",
    ];
    
    const randomResponse = responses[Math.floor(Math.random() * responses.length)];
    
    if (userMessage.toLowerCase().includes('lesson plan') || userMessage.toLowerCase().includes('planning')) {
      return `${randomResponse}\n\nFor effective lesson planning, consider these key elements:\n\n1. **Learning Objectives**: What will students know/be able to do?\n2. **Assessment**: How will you measure learning?\n3. **Activities**: Engaging tasks that support objectives\n4. **Differentiation**: Support for diverse learners\n5. **Materials**: Resources and technology needed\n\nWhat specific subject or grade level are you planning for?`;
    }
    
    if (userMessage.toLowerCase().includes('assessment') || userMessage.toLowerCase().includes('test') || userMessage.toLowerCase().includes('quiz')) {
      return `${randomResponse}\n\nFor creating effective assessments:\n\n1. **Align with learning objectives**\n2. **Use varied question types** (multiple choice, short answer, essay)\n3. **Include different cognitive levels** (recall, analysis, application)\n4. **Provide clear rubrics**\n5. **Consider accessibility needs**\n\nWould you like help creating specific questions or developing a rubric?`;
    }
    
    if (userMessage.toLowerCase().includes('classroom management') || userMessage.toLowerCase().includes('behavior')) {
      return `${randomResponse}\n\nEffective classroom management strategies:\n\n1. **Establish clear expectations** from day one\n2. **Create consistent routines** and procedures\n3. **Use positive reinforcement** systems\n4. **Build relationships** with students\n5. **Have a plan for addressing disruptions**\n\nWhat specific behavior challenges are you experiencing?`;
    }
    
    if (userMessage.toLowerCase().includes('differentiation') || userMessage.toLowerCase().includes('diverse learners')) {
      return `${randomResponse}\n\nDifferentiation strategies to consider:\n\n1. **Content**: Vary what students learn\n2. **Process**: Adjust how students learn\n3. **Product**: Modify how students demonstrate learning\n4. **Learning environment**: Adapt the classroom setting\n\nThis can include flexible grouping, choice boards, tiered assignments, and multiple modalities. What subject area are you working with?`;
    }
    
    return `${randomResponse}\n\nI can help with lesson planning, assessment design, classroom management strategies, differentiated instruction, curriculum alignment, educational technology integration, and professional development topics.\n\nCould you provide more details about your specific teaching context or challenge?`;
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage || "I've uploaded materials for you to review.",
      timestamp: new Date().toISOString(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setUploadedFiles([]);
    setIsLoading(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant", 
        content: generateTeacherResponse(inputMessage),
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1800);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    const fileData = files.map(file => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      type: file.type
    }));
    setUploadedFiles(prev => [...prev, ...fileData]);
  };

  const removeFile = (fileId) => {
    setUploadedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="border-b bg-white px-6 py-4 shadow-sm">
        <div className="flex items-center gap-3">
          <Link to="/teacher-dashboard">
            <Button variant="outline" className="px-3 py-2">
              ← Back to Portal
            </Button>
          </Link>
          <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">💬</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Teacher Chat</h1>
            <p className="text-sm text-gray-500">Your AI teaching assistant for professional support</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🎓</span>
              </div>
            )}
            
            <div className={`max-w-3xl ${message.role === 'user' ? 'order-first' : ''}`}>
              <div className={`rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-indigo-600 text-white ml-auto' 
                  : 'bg-white border shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.role === 'user' ? 'You' : 'Teaching Assistant'}
                  </span>
                  <span className="text-xs opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </span>
                </div>
                
                <div className="whitespace-pre-wrap">
                  {message.content}
                </div>
                
                {message.files && (
                  <div className="mt-2 space-y-1">
                    {message.files.map((file) => (
                      <div key={file.id} className="text-xs bg-black bg-opacity-20 rounded px-2 py-1">
                        📎 {file.name} ({formatFileSize(file.size)})
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {message.role === 'user' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">👨‍🏫</span>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm">🎓</span>
            </div>
            <div className="bg-white border shadow-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">Analyzing your request...</span>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t bg-white p-4">
        {/* File Upload Area */}
        {uploadedFiles.length > 0 && (
          <div className="mb-3 p-3 bg-gray-50 rounded-lg">
            <div className="text-sm font-medium text-gray-700 mb-2">Uploaded Materials:</div>
            <div className="space-y-2">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between bg-white rounded px-3 py-2 border">
                  <span className="text-sm">📎 {file.name} ({formatFileSize(file.size)})</span>
                  <Button 
                    onClick={() => removeFile(file.id)}
                    variant="ghost" 
                    className="text-red-500 hover:text-red-700 px-2 py-1 h-auto"
                  >
                    ✕
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <Textarea
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about lesson planning, assessment design, classroom management, curriculum development, or any teaching challenge..."
              className="min-h-16 max-h-32 resize-none"
              disabled={isLoading}
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <input
              type="file"
              multiple
              onChange={handleFileUpload}
              className="hidden"
              id="teacher-file-upload"
              accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.xls,.xlsx"
            />
            <Button
              onClick={() => document.getElementById('teacher-file-upload').click()}
              variant="outline"
              className="px-3 py-2"
              disabled={isLoading}
              title="Upload lesson materials, worksheets, or documents"
            >
              📎
            </Button>
            
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || (!inputMessage.trim() && uploadedFiles.length === 0)}
              className="px-6 py-2"
            >
              {isLoading ? 'Sending...' : 'Send'}
            </Button>
          </div>
        </div>
        
        <div className="text-xs text-gray-500 mt-2 text-center">
          Professional teaching support | Upload materials for review and feedback
        </div>
      </div>
    </div>
  );
}