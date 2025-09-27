const HF_TOKEN = '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';
const HF_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';

const InvokeLLM = async ({ prompt, role = 'student' }) => {
  try {
    let contextualPrompt = prompt;
    
    if (role === 'teacher') {
      contextualPrompt = `You are an expert AI teaching assistant. Help with education topics.\n\nTeacher: ${prompt}`;
    } else {
      contextualPrompt = `You are a friendly AI tutor helping a student.\n\nStudent: ${prompt}`;
    }

    const response = await fetch(HF_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${HF_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: contextualPrompt,
        parameters: {
          max_length: 150,
          temperature: 0.7,
          return_full_text: false
        }
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    
    if (result && result[0] && result[0].generated_text) {
      return result[0].generated_text;
    }
    
    return "I'm here to help! Could you tell me more about what you'd like to know?";
    
  } catch (error) {
    console.error('AI API Error:', error);
    return role === 'teacher' 
      ? "I'm having connection issues. As your teaching assistant, I'm still here to help with lesson planning, assessments, and educational strategies."
      : "I'm having trouble connecting right now, but I'm still here to help with your learning! Try asking again.";
  }
};

const UploadFile = async (file) => {
  return {
    id: 'file_' + Math.random().toString(36).substr(2, 9),
    name: file.name,
    url: URL.createObjectURL(file),
    uploadedAt: new Date().toISOString()
  };
};

// Export using this exact syntax
export { InvokeLLM, UploadFile };