import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Button } from '../components/ui/button';

const tools = [
	{
		title: 'Worksheet Generator',
		description: 'Create rigorous, standards-aligned worksheets.',
		url: '/worksheet-generator',
		color: 'bg-blue-500',
		emoji: '📄',
	},
	{
		title: 'Practice Test Generator',
		description: 'Generate comprehensive practice tests for units or semesters.',
		url: '/test-generator',
		color: 'bg-green-500',
		emoji: '📝',
	},
	{
		title: 'Practice Quiz Generator',
		description: 'Create targeted quizzes for specific topics and lessons.',
		url: '/quiz-generator',
		color: 'bg-yellow-500',
		emoji: '❓',
	},
	{
		title: 'Lesson Planner',
		description: 'Develop structured lesson plans for days, weeks, or units.',
		url: '/lesson-planner',
		color: 'bg-purple-500',
		emoji: '📚',
	},
	{
		title: 'AI Auto-Grader',
		description: 'Upload student work for automated grading and feedback.',
		url: '/ai-grader',
		color: 'bg-red-500',
		emoji: '🤖',
	},
	{
		title: 'Teacher Chat',
		description: 'Your general-purpose AI teaching assistant.',
		url: '/teacher-chat',
		color: 'bg-indigo-500',
		emoji: '💬',
	},
	{
		title: 'My Saved Materials',
		description: 'Access all your generated worksheets, tests, and quizzes.',
		url: '/my-materials',
		color: 'bg-gray-500',
		emoji: '🗂️',
	},
];

export default function TeacherDashboard() {
	return (
		<div className="min-h-screen bg-gray-50 p-4 md:p-8">
			<div className="max-w-7xl mx-auto">
				{/* Header */}
				<div className="flex items-center gap-4 mb-8">
					<Link to="/">
						<Button variant="outline" className="px-3 py-2">
							← Back to Dashboard
						</Button>
					</Link>
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
							<span className="text-white text-2xl">👨‍🏫</span>
						</div>
						<div>
							<h1 className="text-3xl font-bold text-gray-900">
								Teacher Portal
							</h1>
							<p className="text-gray-600">
								Your suite of AI-powered teaching tools
							</p>
						</div>
					</div>
				</div>

				{/* Tools Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{tools.map((tool) => (
						<Link to={tool.url} key={tool.title}>
							<Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-200 cursor-pointer">
								<CardHeader className="flex flex-row items-center gap-4">
									<div
										className={`w-12 h-12 rounded-lg flex items-center justify-center ${tool.color}`}
									>
										<span className="text-white text-xl">
											{tool.emoji}
										</span>
									</div>
									<div className="flex-1">
										<CardTitle className="text-lg mb-2">
											{tool.title}
										</CardTitle>
										<p className="text-sm text-gray-600">
											{tool.description}
										</p>
									</div>
								</CardHeader>
							</Card>
						</Link>
					))}
				</div>

				{/* Quick Stats */}
				<div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
					<Card>
						<CardContent className="p-6 text-center">
							<div className="text-2xl font-bold text-blue-600">12</div>
							<div className="text-sm text-gray-600">
								Worksheets Created
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6 text-center">
							<div className="text-2xl font-bold text-green-600">8</div>
							<div className="text-sm text-gray-600">Tests Generated</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-6 text-center">
							<div className="text-2xl font-bold text-purple-600">24</div>
							<div className="text-sm text-gray-600">Lesson Plans</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}