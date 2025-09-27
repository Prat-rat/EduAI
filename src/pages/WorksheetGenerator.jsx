import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Select } from "../components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Label } from "../components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";

export default function WorksheetGenerator() {
  const [topic, setTopic] = useState("Photosynthesis");
  const [courseAndGrade, setCourseAndGrade] = useState("High School Biology");
  const [worksheetType, setWorksheetType] = useState("mixed");
  const [additionalInstructions, setAdditionalInstructions] = useState("");
  const [generatedWorksheet, setGeneratedWorksheet] = useState("");
  const [answerKey, setAnswerKey] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("worksheet");

  const worksheetTypes = [
    { value: "mixed", label: "Mixed (Multiple Choice, Short Answer, etc.)" },
    { value: "multiple_choice", label: "Multiple Choice Only" },
    { value: "short_answer", label: "Short Answer Questions" },
    { value: "essay", label: "Essay Questions" },
    { value: "fill_blank", label: "Fill in the Blanks" },
    { value: "matching", label: "Matching Questions" },
    { value: "diagram", label: "Diagram Labeling/Analysis Questions" },
    { value: "problem_solving", label: "Problem Solving (Math/Science)" }
  ];

  const generateMockWorksheet = (topic, type) => {
    const worksheet = `# Worksheet: ${topic}

## Course: ${courseAndGrade}
### Name: _________________________ Date: _________________

---

## Section 1: Multiple Choice
*Choose the best answer for each question.*

1. What is the primary function of ${topic.toLowerCase()}?
   a) Option A
   b) Option B  
   c) Option C
   d) Option D

2. Which of the following best describes ${topic.toLowerCase()}?
   a) Process A
   b) Process B
   c) Process C
   d) Process D

---

## Section 2: Short Answer
*Provide brief explanations for the following questions.*

3. Explain the importance of ${topic.toLowerCase()} in biological systems.

Answer:

________________________________________________________________

________________________________________________________________

4. Describe the main steps involved in ${topic.toLowerCase()}.

Answer:

________________________________________________________________

________________________________________________________________

---

## Section 3: Essay Question

5. Write a detailed paragraph explaining how ${topic.toLowerCase()} impacts the environment and why it's important for life on Earth.

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________`;

    const answers = `# Answer Key - ${topic}

## Multiple Choice
1. c) Option C
2. b) Process B

## Short Answer
3. ${topic} is important because it provides the foundation for energy transfer in biological systems and maintains the balance of gases in our atmosphere.

4. The main steps of ${topic.toLowerCase()} include: light absorption by chlorophyll, water splitting, carbon dioxide fixation, and glucose production.

## Essay Question
5. Sample answer should include: explanation of energy conversion, oxygen production, role in food webs, and environmental impact including carbon dioxide absorption.`;

    return { worksheet, answers };
  };

  const handleGenerate = async () => {
    if (!topic || !courseAndGrade) return;
    
    setIsLoading(true);
    setGeneratedWorksheet("");
    setAnswerKey("");
    
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const { worksheet, answers } = generateMockWorksheet(topic, worksheetType);
      setGeneratedWorksheet(worksheet);
      setAnswerKey(answers);
      setActiveTab("worksheet");
    } catch (error) {
      console.error("Error generating worksheet:", error);
      setGeneratedWorksheet("Error generating worksheet. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Print Worksheet</title>');
    printWindow.document.write(`
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1, h2, h3 { color: #333; }
        hr { border: 1px solid #ccc; margin: 20px 0; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<pre>${generatedWorksheet}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([generatedWorksheet], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${topic}_worksheet.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link to="/teacher-dashboard">
            <Button variant="outline" className="px-3 py-2">
              ← Back to Portal
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📄</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Worksheet Generator</h1>
              <p className="text-gray-600">Create custom worksheets for your students</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Configuration Panel */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="course">Course & Grade Level</Label>
                <Input 
                  id="course"
                  value={courseAndGrade} 
                  onChange={(e) => setCourseAndGrade(e.target.value)}
                  placeholder="e.g., High School Biology"
                />
              </div>
              
              <div>
                <Label htmlFor="topic">Topic</Label>
                <Input 
                  id="topic"
                  value={topic} 
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="e.g., Photosynthesis"
                />
              </div>
              
              <div>
                <Label htmlFor="type">Worksheet Type</Label>
                <Select 
                  value={worksheetType} 
                  onValueChange={setWorksheetType}
                >
                  {worksheetTypes.map((type) => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </Select>
              </div>
              
              <div>
                <Label htmlFor="instructions">Additional Instructions</Label>
                <Textarea 
                  id="instructions"
                  value={additionalInstructions} 
                  onChange={(e) => setAdditionalInstructions(e.target.value)}
                  placeholder="Any specific requirements or notes..."
                  className="min-h-20"
                />
              </div>
              
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !topic || !courseAndGrade} 
                className="w-full"
              >
                {isLoading ? "Generating..." : "Generate Worksheet"}
              </Button>
            </CardContent>
          </Card>

          {/* Generated Content */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Content</CardTitle>
                {generatedWorksheet && (
                  <div className="flex gap-2">
                    <Button onClick={handlePrint} variant="outline" className="px-3 py-1 text-sm">
                      Print
                    </Button>
                    <Button onClick={handleDownload} variant="outline" className="px-3 py-1 text-sm">
                      Download
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              {isLoading && (
                <div className="text-center p-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating your worksheet...</p>
                </div>
              )}
              
              {generatedWorksheet && !isLoading && (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="worksheet">Worksheet</TabsTrigger>
                    <TabsTrigger value="answers">Answer Key</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="worksheet">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedWorksheet}
                      </pre>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="answers">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {answerKey}
                      </pre>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
              
              {!isLoading && !generatedWorksheet && (
                <div className="text-center p-8 text-gray-500">
                  <div className="text-4xl mb-4">📄</div>
                  <p>Your generated worksheet will appear here</p>
                  <p className="text-sm mt-2">Fill in the form on the left and click "Generate Worksheet"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}