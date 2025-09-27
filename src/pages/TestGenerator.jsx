import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';

export default function TestGenerator() {
  const [course, setCourse] = useState('AP US History');
  const [unit, setUnit] = useState('Unit 3: Revolution and the New Nation (1754-1800)');
  const [instructions, setInstructions] = useState('');
  const [generatedData, setGeneratedData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('test');

  const generateMockTest = (course, unit, instructions) => {
    // AP Biology Unit 2 Test (Practice)
    const mcQuestions = [
      {
        question: "Which of the following organelles is primarily responsible for producing ATP in eukaryotic cells?",
        options: [
          "Chloroplast",
          "Mitochondrion",
          "Golgi apparatus",
          "Smooth endoplasmic reticulum"
        ],
        correct: 1,
        explanation: "The mitochondrion is the site of aerobic respiration and produces ATP. Chloroplasts produce glucose during photosynthesis, not ATP directly for cell work."
      },
      {
        question: "The plasma membrane exhibits “selective permeability.” Which of the following best explains this property?",
        options: [
          "All molecules move freely across the membrane.",
          "Only charged molecules pass through easily.",
          "Some substances cross more easily than others.",
          "Large molecules can pass through without restriction."
        ],
        correct: 2,
        explanation: "The plasma membrane is selectively permeable due to its phospholipid bilayer + proteins. Small nonpolar molecules cross easily, while ions and large molecules need transport proteins."
      },
      {
        question: "Which of the following is the primary role of the rough ER?",
        options: [
          "Lipid synthesis",
          "Protein modification and folding",
          "ATP production",
          "DNA replication"
        ],
        correct: 1,
        explanation: "The rough ER has ribosomes attached; it synthesizes and folds proteins, which are often sent to the Golgi. Smooth ER synthesizes lipids."
      },
      {
        question: "If a cell is placed in a hypertonic solution, what will most likely occur?",
        options: [
          "Water enters the cell, and it bursts.",
          "Water leaves the cell, and it shrinks.",
          "The cell remains unchanged.",
          "Solutes diffuse into the cell."
        ],
        correct: 1,
        explanation: "In a hypertonic solution, the environment has a higher solute concentration, so water moves out by osmosis."
      },
      {
        question: "The endosymbiotic theory explains the origin of which two organelles?",
        options: [
          "Nucleus and lysosome",
          "Chloroplast and mitochondrion",
          "ER and Golgi apparatus",
          "Ribosome and vacuole"
        ],
        correct: 1,
        explanation: "Both have double membranes, their own DNA, and ribosomes → evidence for endosymbiosis."
      },
      {
        question: "Which structure increases surface area for absorption in the small intestine and in some single-celled organisms?",
        options: [
          "Cilia",
          "Flagella",
          "Microvilli",
          "Lysosomes"
        ],
        correct: 2,
        explanation: "Microvilli increase surface area for absorption (in intestines, amoebas). Cilia/flagella are for movement."
      },
      {
        question: "Aquaporins are specialized proteins that:",
        options: [
          "Pump sodium ions across the membrane",
          "Allow water molecules to move rapidly across the membrane",
          "Break down hydrogen peroxide",
          "Transport ATP into the cell"
        ],
        correct: 1,
        explanation: "Aquaporins are channel proteins for water, making osmosis faster."
      },
      {
        question: "Which organelle is most directly responsible for detoxifying harmful substances in liver cells?",
        options: [
          "Rough ER",
          "Smooth ER",
          "Lysosome",
          "Nucleolus"
        ],
        correct: 1,
        explanation: "Smooth ER detoxifies poisons and drugs, especially in liver cells."
      }
    ];

    const frqQuestions = [
      {
        question: `FRQ 1. Membrane Transport
(a) Explain how the structure of the phospholipid bilayer allows the plasma membrane to act as a selective barrier.
(b) Compare passive and active transport, providing one example of each.
(c) Predict what would happen to an animal cell placed in a hypotonic solution and explain why.`,
        points: 5
      },
      {
        question: `FRQ 2. Endosymbiotic Theory and Organelles
Mitochondria and chloroplasts are thought to have evolved through endosymbiosis.
(a) Provide two pieces of evidence that support this theory.
(b) Describe how compartmentalization of organelles provides advantages for eukaryotic cells compared to prokaryotic cells.
(c) Explain how mitochondria contribute to energy production in cells and relate this to surface area.`,
        points: 5
      }
    ];

    const test_content = `# AP Biology – Unit 2 Test (Practice)

**Name:** _________________________ **Date:** _________________

**Instructions:** This test consists of multiple choice questions and free response questions. ${instructions || 'Answer all questions completely and show your work where applicable.'}

---

## Part A: Multiple Choice Questions (MCQs)

Select the best answer for each question.

${mcQuestions.map((q, i) => `
${i + 1}. ${q.question}
A. ${q.options[0]}
B. ${q.options[1]}
C. ${q.options[2]}
D. ${q.options[3]}
`).join('\n')}

---

## Part B: Free Response Questions (FRQs)

${frqQuestions.map((q, i) => `
**Question ${i + 1} (${q.points} points):**

${q.question}

**Answer:**

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

________________________________________________________________

`).join('')}

---

**Total Points: 20**

**Time Limit: 45 minutes**`;

    const answer_key = `# AP Biology – Unit 2 Test (Answer Key & Explanations)

## Part A: Multiple Choice

1. B – Mitochondrion
2. C – Some substances cross more easily than others
3. B – Protein modification and folding
4. B – Water leaves the cell, and it shrinks
5. B – Chloroplast and mitochondrion
6. C – Microvilli
7. B – Allow water molecules to move rapidly across the membrane
8. B – Smooth ER

## Part B: Free Response (FRQs with explanations)

FRQ 1. Membrane Transport

(a) Explain how the structure of the phospholipid bilayer allows the plasma membrane to act as a selective barrier.
(b) Compare passive and active transport, providing one example of each.
(c) Predict what would happen to an animal cell placed in a hypotonic solution and explain why.

Scoring guidelines (like AP style):
- Explanation of bilayer structure (1 pt)
- Correct comparison of passive vs active (2 pts)
- Correct prediction of cell swelling/lysis with reasoning (2 pts)

FRQ 2. Endosymbiotic Theory and Organelles

(a) Provide two pieces of evidence that support this theory.
(b) Describe how compartmentalization of organelles provides advantages for eukaryotic cells compared to prokaryotic cells.
(c) Explain how mitochondria contribute to energy production in cells and relate this to surface area.
`;

    const explanations = `# AP Biology – Unit 2 Test (Detailed Explanations)

## Multiple Choice Explanations

1. B – Mitochondrion
Explanation: The mitochondrion is the site of aerobic respiration and produces ATP. Chloroplasts produce glucose during photosynthesis, not ATP directly for cell work.

2. C – Some substances cross more easily than others
Explanation: The plasma membrane is selectively permeable due to its phospholipid bilayer + proteins. Small nonpolar molecules cross easily, while ions and large molecules need transport proteins.

3. B – Protein modification and folding
Explanation: The rough ER has ribosomes attached; it synthesizes and folds proteins, which are often sent to the Golgi. Smooth ER synthesizes lipids.

4. B – Water leaves the cell, and it shrinks
Explanation: In a hypertonic solution, the environment has a higher solute concentration, so water moves out by osmosis.

5. B – Chloroplast and mitochondrion
Explanation: Both have double membranes, their own DNA, and ribosomes → evidence for endosymbiosis.

6. C – Microvilli
Explanation: Microvilli increase surface area for absorption (in intestines, amoebas). Cilia/flagella are for movement.

7. B – Allow water molecules to move rapidly across the membrane
Explanation: Aquaporins are channel proteins for water, making osmosis faster.

8. B – Smooth ER
Explanation: Smooth ER detoxifies poisons and drugs, especially in liver cells.

## Free Response Explanations

FRQ 1. Membrane Transport

(a) The phospholipid bilayer has hydrophilic heads facing outward and hydrophobic tails inward, creating a barrier that blocks polar/charged molecules but allows small nonpolar molecules to pass. This structure is the basis for selective permeability.

(b) Passive transport moves molecules down their concentration gradient without energy (e.g., oxygen diffusion). Active transport requires ATP to move molecules against their gradient (e.g., sodium-potassium pump).

(c) In a hypotonic solution, water enters the animal cell, causing it to swell and possibly burst (lyse), because the solute concentration is higher inside the cell.

FRQ 2. Endosymbiotic Theory and Organelles

(a) Evidence: Mitochondria and chloroplasts have their own circular DNA, double membranes, and reproduce by binary fission.

(b) Compartmentalization allows eukaryotic cells to separate incompatible reactions and create specialized environments, increasing efficiency.

(c) Mitochondria have highly folded inner membranes (cristae), increasing surface area for ATP production via the electron transport chain.
`;

    return { test_content, answer_key, explanations };
  };

  const handleGenerate = async () => {
    if (!course || !unit) return;
    
    setIsLoading(true);
    setGeneratedData(null);
    
    try {
      await new Promise(resolve => setTimeout(resolve, 3000));
      const result = generateMockTest(course, unit, instructions);
      setGeneratedData(result);
      setActiveTab('test');
    } catch (error) {
      console.error('Error generating test:', error);
      alert('Failed to generate test. Please try again.');
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

  const handlePrint = () => {
    if (!generatedData) return;
    const printWindow = window.open('', '', 'height=800,width=800');
    printWindow.document.write('<html><head><title>Print Test</title>');
    printWindow.document.write(`
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; margin: 20px; }
        h1, h2, h3 { color: #333; }
        hr { border: 1px solid #ccc; margin: 20px 0; }
        .page-break { page-break-after: always; }
      </style>
    `);
    printWindow.document.write('</head><body>');
    printWindow.document.write(`<pre>${generatedData.test_content}</pre>`);
    printWindow.document.write('</body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
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
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">📝</span>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Practice Test Generator</h1>
              <p className="text-gray-600">Create comprehensive practice tests for units or semesters</p>
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
                <Label htmlFor="unit">Unit / Semester</Label>
                <Input 
                  id="unit"
                  value={unit} 
                  onChange={(e) => setUnit(e.target.value)} 
                />
              </div>
              <div>
                <Label htmlFor="instructions">Additional Instructions</Label>
                <Textarea 
                  id="instructions"
                  value={instructions} 
                  onChange={(e) => setInstructions(e.target.value)}
                  placeholder="Special instructions for the test..."
                />
              </div>
              <Button 
                onClick={handleGenerate} 
                disabled={isLoading || !course || !unit} 
                className="w-full"
              >
                {isLoading ? 'Generating...' : 'Generate Test'}
              </Button>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Generated Test</CardTitle>
                {generatedData && (
                  <div className="flex gap-2">
                    <Button 
                      onClick={handlePrint}
                      variant="outline" 
                      className="px-3 py-1 text-sm"
                    >
                      Print
                    </Button>
                    <Button 
                      onClick={() => handleDownload(generatedData.test_content, `${course}_${unit}_test.txt`)}
                      variant="outline" 
                      className="px-3 py-1 text-sm"
                    >
                      Download Test
                    </Button>
                    <Button 
                      onClick={() => handleDownload(generatedData.answer_key, `${course}_${unit}_answers.txt`)}
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
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Generating comprehensive test...</p>
                </div>
              )}
              
              {generatedData && !isLoading && (
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="test">Practice Test</TabsTrigger>
                    <TabsTrigger value="key">Answer Key</TabsTrigger>
                    <TabsTrigger value="explanations">Explanations</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="test">
                    <div className="bg-white border rounded p-4 max-h-96 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm font-mono">
                        {generatedData.test_content}
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
                  <div className="text-4xl mb-4">📝</div>
                  <p>Your generated test will appear here</p>
                  <p className="text-sm mt-2">Configure the settings and click "Generate Test"</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}