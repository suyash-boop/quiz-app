"use client";

import { useQuiz, Quiz } from './QuizProvider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Clock, BookOpen, Zap, Globe, Code, Palette } from 'lucide-react';

const quizzes: Quiz[] = [
  {
    id: 'javascript',
    title: 'JavaScript Fundamentals',
    description: 'Test your knowledge of JavaScript basics, ES6+, and modern concepts',
    category: 'Programming',
    color: 'bg-yellow-500',
    timeLimit: 600,
    questions: [
      {
        id: 1,
        question: 'What is the correct way to declare a variable in JavaScript ES6+?',
        type: 'multiple-choice',
        options: ['var name = "John"', 'let name = "John"', 'const name = "John"', 'All of the above'],
        correctAnswer: 3,
        explanation: 'All three are valid ways to declare variables, but let and const are preferred in ES6+ for block scoping.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'JavaScript is a compiled language.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'JavaScript is an interpreted language, not compiled. It is executed by JavaScript engines in browsers or Node.js.',
        difficulty: 'easy',
      },
      {
        id: 3,
        question: 'Which method is used to add an element to the end of an array?',
        type: 'multiple-choice',
        options: ['push()', 'pop()', 'shift()', 'unshift()'],
        correctAnswer: 0,
        explanation: 'The push() method adds one or more elements to the end of an array and returns the new length.',
        difficulty: 'medium',
      },
      {
        id: 4,
        question: 'What does the spread operator (...) do?',
        type: 'multiple-choice',
        options: [
          'Creates a new array',
          'Spreads elements of an iterable',
          'Concatenates strings',
          'Defines a function'
        ],
        correctAnswer: 1,
        explanation: 'The spread operator (...) allows an iterable to expand in places where multiple elements are expected.',
        difficulty: 'medium',
      },
      {
        id: 5,
        question: 'Arrow functions have their own "this" context.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Arrow functions do not have their own "this" context. They inherit "this" from the enclosing scope.',
        difficulty: 'hard',
      },
    ],
  },
  {
    id: 'react',
    title: 'React Development',
    description: 'Explore React hooks, components, and modern React patterns',
    category: 'Programming',
    color: 'bg-blue-500',
    timeLimit: 480,
    questions: [
      {
        id: 1,
        question: 'What is the correct way to create a React functional component?',
        type: 'multiple-choice',
        options: [
          'function MyComponent() { return <div>Hello</div>; }',
          'const MyComponent = () => <div>Hello</div>;',
          'React.Component MyComponent extends Component { render() { return <div>Hello</div>; } }',
          'Both A and B'
        ],
        correctAnswer: 3,
        explanation: 'Both function declarations and arrow functions are valid ways to create functional components in React.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'useState returns an array with exactly two elements.',
        type: 'true-false',
        correctAnswer: 'true',
        explanation: 'useState returns an array with two elements: the current state value and a function to update it.',
        difficulty: 'easy',
      },
      {
        id: 3,
        question: 'Which hook is used for side effects in React?',
        type: 'multiple-choice',
        options: ['useState', 'useEffect', 'useContext', 'useReducer'],
        correctAnswer: 1,
        explanation: 'useEffect is used to perform side effects in functional components, such as data fetching or DOM manipulation.',
        difficulty: 'medium',
      },
      {
        id: 4,
        question: 'What is the virtual DOM?',
        type: 'multiple-choice',
        options: [
          'A copy of the real DOM stored in memory',
          'A JavaScript representation of the real DOM',
          'A faster version of the DOM',
          'All of the above'
        ],
        correctAnswer: 3,
        explanation: 'The virtual DOM is a JavaScript representation of the real DOM kept in memory, which makes React faster through efficient diffing.',
        difficulty: 'medium',
      },
      {
        id: 5,
        question: 'React components must start with a capital letter.',
        type: 'true-false',
        correctAnswer: 'true',
        explanation: 'React component names must start with a capital letter to distinguish them from regular HTML elements.',
        difficulty: 'easy',
      },
    ],
  },
  {
    id: 'design',
    title: 'UI/UX Design Principles',
    description: 'Master the fundamentals of user interface and experience design',
    category: 'Design',
    color: 'bg-purple-500',
    timeLimit: 420,
    questions: [
      {
        id: 1,
        question: 'What does UX stand for?',
        type: 'multiple-choice',
        options: ['User Experience', 'User Extension', 'Unified Experience', 'User Explanation'],
        correctAnswer: 0,
        explanation: 'UX stands for User Experience, which focuses on the overall experience a user has with a product.',
        difficulty: 'easy',
      },
      {
        id: 2,
        question: 'White space in design is considered wasted space.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'White space (negative space) is crucial in design for readability, focus, and visual hierarchy.',
        difficulty: 'easy',
      },
      {
        id: 3,
        question: 'What is the recommended minimum contrast ratio for normal text?',
        type: 'multiple-choice',
        options: ['3:1', '4.5:1', '7:1', '2:1'],
        correctAnswer: 1,
        explanation: 'WCAG guidelines recommend a minimum contrast ratio of 4.5:1 for normal text to ensure accessibility.',
        difficulty: 'medium',
      },
      {
        id: 4,
        question: 'Which design principle focuses on making the most important elements stand out?',
        type: 'multiple-choice',
        options: ['Balance', 'Hierarchy', 'Contrast', 'Repetition'],
        correctAnswer: 1,
        explanation: 'Visual hierarchy uses size, color, contrast, and positioning to guide users attention to the most important elements first.',
        difficulty: 'medium',
      },
      {
        id: 5,
        question: 'Mobile-first design means designing for mobile devices only.',
        type: 'true-false',
        correctAnswer: 'false',
        explanation: 'Mobile-first design means starting with mobile designs and progressively enhancing for larger screens.',
        difficulty: 'easy',
      },
    ],
  },
];

const categoryIcons = {
  Programming: Code,
  Design: Palette,
  General: BookOpen,
};

export function CategorySelection() {
  const { dispatch } = useQuiz();

  const handleStartQuiz = (quiz: Quiz) => {
    dispatch({ type: 'START_QUIZ', payload: quiz });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-3 rounded-2xl">
              <Zap className="h-8 w-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
            QuizMaster
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Challenge yourself with our interactive quizzes. Test your knowledge and learn something new!
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {quizzes.map((quiz) => {
            const IconComponent = categoryIcons[quiz.category as keyof typeof categoryIcons] || BookOpen;
            
            return (
              <Card 
                key={quiz.id} 
                className="group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm"
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between mb-2">
                    <div className={`p-2 rounded-lg ${quiz.color.replace('bg-', 'bg-opacity-10 bg-')} group-hover:scale-110 transition-transform duration-300`}>
                      <IconComponent className={`h-6 w-6 ${quiz.color.replace('bg-', 'text-')}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {quiz.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                    {quiz.title}
                  </CardTitle>
                  <CardDescription className="text-sm leading-relaxed">
                    {quiz.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      <span>{quiz.questions.length} questions</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>{Math.floor(quiz.timeLimit / 60)} min</span>
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleStartQuiz(quiz)}
                    className="w-full group-hover:bg-blue-600 transition-colors duration-300"
                  >
                    Start Quiz
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
}