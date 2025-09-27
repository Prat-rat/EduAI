import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Card } from "../components/ui/card";

export default function StudentChat() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const messagesEndRef = useRef(null);

  // AI function built directly into this component
  const callAI = async (prompt) => {
  const HF_TOKEN = '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';
  console.log('Token being used:', HF_TOKEN.substring(0, 10) + '...');
  const HF_API_URL = 'https://api-inference.huggingface.co/models/gpt2';

  try {
    console.log('Making API call with prompt:', prompt);

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Student asks: "${prompt}"\nAI tutor responds:`,
        parameters: {
          max_length: 100,
          temperature: 0.7,
          do_sample: true,
          return_full_text: false
        }
      })
    });

    console.log('Response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.log('Error response:', errorText);
      throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
    }

    const result = await response.json();
    console.log('API result:', result);
    
    if (result && Array.isArray(result) && result[0] && result[0].generated_text) {
      // Clean up the response to remove the prompt part
      let response_text = result[0].generated_text;
      if (response_text.includes('AI tutor responds:')) {
        response_text = response_text.split('AI tutor responds:')[1];
      }
      return response_text.trim() || "I'm here to help! What would you like to know?";
    }
    
    return "I'm here to help! What would you like to know?";
    
  } catch (error) {
    console.error('Full AI API Error:', error);
    return `I'm having connection issues, but I'm still here to help! Error: ${error.message}`;
  }
};

  // Initialize with welcome message
  useEffect(() => {
    setMessages([{
      id: 1,
      role: "assistant",
      content: "Hi there! I'm your AI study buddy. I can help you with homework, explain concepts, analyze documents, and answer questions about any subject. What would you like to work on today?",
      timestamp: new Date().toISOString()
    }]);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim() && uploadedFiles.length === 0) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage || "I've uploaded a file for you to analyze.",
      timestamp: new Date().toISOString(),
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    const currentInput = inputMessage;
    setInputMessage("");
    setUploadedFiles([]);
    setIsLoading(true);

    try {
      const aiResponseText = await callAI(currentInput || "Please help me understand this topic.");
      
      const aiResponse = {
        id: Date.now() + 1,
        role: "assistant", 
        content: aiResponseText,
        timestamp: new Date().toISOString()
      };
      
      setMessages(prev => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error:', error);
      const errorResponse = {
        id: Date.now() + 1,
        role: "assistant", 
        content: "I'm having trouble connecting. Please try again!",
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorResponse]);
    } finally {
      setIsLoading(false);
    }
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
          <Link to="/">
            <Button variant="outline" className="px-3 py-2">
              ← Back to Dashboard
            </Button>
          </Link>
          <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
            <span className="text-white text-lg">📚</span>
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">Student Chat</h1>
            <p className="text-sm text-gray-500">AI-powered homework help and tutoring</p>
          </div>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            {message.role === 'assistant' && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">🤖</span>
              </div>
            )}
            
            <div className={`max-w-3xl ${message.role === 'user' ? 'order-first' : ''}`}>
              <div className={`rounded-lg p-4 ${
                message.role === 'user' 
                  ? 'bg-blue-600 text-white ml-auto' 
                  : 'bg-white border shadow-sm'
              }`}>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium">
                    {message.role === 'user' ? 'You' : 'AI Tutor'}
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
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">👤</span>
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex gap-4 justify-start">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center">
              <span className="text-white text-sm">🤖</span>
            </div>
            <div className="bg-white border shadow-sm rounded-lg p-4">
              <div className="flex items-center gap-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                </div>
                <span className="text-sm text-gray-500">AI is thinking...</span>
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
            <div className="text-sm font-medium text-gray-700 mb-2">Uploaded Files:</div>
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
              placeholder="Ask me anything! I can help with homework, explain concepts, or analyze documents..."
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
              id="file-upload"
              accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
            />
            <Button
              onClick={() => document.getElementById('file-upload').click()}
              variant="outline"
              className="px-3 py-2"
              disabled={isLoading}
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
          Tip: Press Enter to send, Shift+Enter for new line. Real AI responses enabled!
        </div>
      </div>
    </div>
  );
}