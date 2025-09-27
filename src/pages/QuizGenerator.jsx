import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function QuizGenerator() {
  const [course, setCourse] = useState('AP Human Geography');
  const [topic, setTopic] = useState('Unit 2.1: Population Distribution');
  const [instructions, setInstructions] = useState('10 multiple choice questions.');
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('quiz');

  const generateMockQuiz = (course, topic, instructions) => {
    // Use the provided 10 questions, answers, and explanations
    const questions = [
      {
        question: "Which of the following best explains why population distribution is uneven at the global scale?",
        options: [
          "Natural increase rate",
          "Availability of resources",
          "Cultural taboos",
          "Economic globalization"
        ],
        correct: 1,
        explanation: "Populations concentrate where water, fertile soil, and favorable climates exist."
      },
      {
        question: "Which region has the highest population density?",
        options: [
          "North America",
          "South Asia",
          "Sub-Saharan Africa",
          "Northern Europe"
        ],
        correct: 1,
        explanation: "South Asia (India, Bangladesh, Pakistan) has one of the highest global population densities."
      },
      {
        question: "Which of the following measures calculates the number of people per unit of arable land?",
        options: [
          "Arithmetic density",
          "Physiological density",
          "Agricultural density",
          "Ecological footprint"
        ],
        correct: 1,
        explanation: "Physiological density measures people per unit of arable (farmable) land."
      },
      {
        question: "A country with a high arithmetic density but low physiological density most likely has…",
        options: [
          "A large amount of arable land",
          "A small amount of arable land",
          "A high agricultural density",
          "A declining population"
        ],
        correct: 0,
        explanation: "If arithmetic density is high but physiological is low, the land available for farming is abundant."
      },
      {
        question: "Which of the following best describes why populations cluster near coasts and rivers?",
        options: [
          "Desire for scenic beauty",
          "Access to fertile land and transportation",
          "Government restrictions on inland settlement",
          "Lower population density inland"
        ],
        correct: 1,
        explanation: "Rivers and coasts provide fertile soils and trade routes, encouraging settlement."
      },
      {
        question: "If Country A has a physiological density of 1,000 and Country B has 200, what does this suggest?",
        options: [
          "Country A has more arable land",
          "Country B is more likely to face food scarcity",
          "Country A has greater pressure on agricultural land",
          "Country B has a higher arithmetic density"
        ],
        correct: 2,
        explanation: "High physiological density means more people per unit of farmland → more strain on resources."
      },
      {
        question: "Agricultural density measures…",
        options: [
          "Farmers per unit of farmland",
          "Population per unit of farmland",
          "Population per unit of land area",
          "Urban population compared to rural"
        ],
        correct: 0,
        explanation: "Agricultural density = farmers ÷ farmland."
      },
      {
        question: "Which factor most directly influences agricultural density?",
        options: [
          "Economic development level",
          "Access to technology",
          "Type of crops grown",
          "All of the above"
        ],
        correct: 3,
        explanation: "Level of development, technology, and crops all affect how many farmers are needed."
      },
      {
        question: "Which of the following regions is most sparsely populated?",
        options: [
          "The Himalayas",
          "The Nile River Valley",
          "The Ganges Plain",
          "The Mekong Delta"
        ],
        correct: 0,
        explanation: "Mountainous regions are sparsely populated due to harsh climates and poor farmland."
      },
      {
        question: "The difference between arithmetic density and physiological density is that arithmetic density…",
        options: [
          "Uses arable land as the denominator",
          "Uses total land area as the denominator",
          "Is always lower than agricultural density",
          "Considers farmers rather than population"
        ],
        correct: 1,
        explanation: "Arithmetic density = population ÷ total land area (not just farmland)."
      }
    ];

    const quiz_content = `# AP Human Geography – Topic 2.1: Population Distribution

**Instructions:** ${instructions}

---

${questions.map((q, i) => `
${i + 1}. ${q.question}
A. ${q.options[0]}
B. ${q.options[1]}
C. ${q.options[2]}
D. ${q.options[3]}
`).join('\n')}
`;

    const answer_key = `# Answer Key – AP Human Geography Topic 2.1

${questions.map((q, i) => 
  `${i + 1}. ${String.fromCharCode(65 + q.correct)} – ${q.options[q.correct]}`
).join('\n')}
`;

    const explanations = `# Answer Key with Explanations – AP Human Geography Topic 2.1

${questions.map((q, i) => 
  `${i + 1}. ${String.fromCharCode(65 + q.correct)} – ${q.options[q.correct]}
${q.explanation}
`
).join('\n')}
`;

    return { quiz_content, answer_key, explanations };
  };

  const handleGenerate = async () => {
    if (!course || !topic) return;
    
    setIsLoading(true);
    setGeneratedData(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      const result = generateMockQuiz(course, topic, instructions);
      setGeneratedData(result);
      setActiveTab('quiz');
    } catch (error) {
      console.error('Error generating quiz:', error);
      alert('Failed to generate quiz. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (content, filename) => {
    const element = document.createElement('a');
    const file = new Blob([content], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = filename;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link to="/teacher-dashboard">
            <Button variant="outline" className="px-3 py-2">
              ← Back to Portal
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">❓</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Practice Quiz Generator</h1>
              <p className="text-gray-600">Create targeted quizzes for specific topics</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="course">Course</Label>
                <Input 
                  id="course"
                  value={course} 
                  onChange={(e) => setCourse(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="topic">Specific Topic (e.g., Unit 2.1)</Label>
                <Input 
                  id="topic"
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="instructions">Additional Instructions</Label>
                <Textarea 
                  id="instructions"
                  value={instructions} 
                  onChange={(e) => setInstructions(e.target.value)} 
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !course || !topic} 
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Quiz'}
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Quiz</CardTitle>
                {generatedData && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleDownload(generatedData.quiz_content, `${topic}_quiz.txt`)}
                      variant="outline" 
                      className="px-3 py-1 text-sm"
                    >
                      Download Quiz
                    </Button>
                    <Button 
                      onClick={() => handleDownload(generatedData.answer_key, `${topic}_answers.txt`)}
                      variant="outline" 
                      className="px-3 py-1 text-sm"
                    >
                      Download Answers
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating quiz...</p>
                </div>
              )}
              
              {generatedData && !isLoading && (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="quiz">Practice Quiz</TabsTrigger>
                    <TabsTrigger value="key">Answer Key</TabsTrigger>
                    <TabsTrigger value="explanations">Explanations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="quiz">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedData.quiz_content}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="key">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedData.answer_key}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="explanations">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedData.explanations}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
              
              {!isLoading && !generatedData && (
                <div className="text-center p-8 text-gray-500">
                  <div className="text-4xl mb-4">❓</div>
                  <p>Your generated quiz will appear here</p>
                  <p className="text-sm mt-2">Configure the settings and click "Generate Quiz"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}