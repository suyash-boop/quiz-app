"use client";

import { useQuiz } from './QuizProvider';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Clock, BookOpen } from 'lucide-react';

export function QuizHeader() {
  const { state } = useQuiz();

  if (!state.currentQuiz) return null;

  const progress = ((state.currentQuestionIndex + 1) / state.currentQuiz.questions.length) * 100;
  const minutes = Math.floor(state.timeRemaining / 60);
  const seconds = state.timeRemaining % 60;
  const timeProgress = (state.timeRemaining / state.currentQuiz.timeLimit) * 100;

  return (
    <Card className="mb-8 p-6 bg-white/80 backdrop-blur-sm border-0 shadow-md">
      <div className="flex flex-col space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {state.currentQuiz.title}
            </h1>
            <p className="text-sm text-muted-foreground">
              Question {state.currentQuestionIndex + 1} of {state.currentQuiz.questions.length}
            </p>
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4" />
              <span>{state.answers.length} answered</span>
            </div>
            
            <div className={`flex items-center gap-2 text-sm font-medium ${
              state.timeRemaining < 60 ? 'text-red-600' : 'text-muted-foreground'
            }`}>
              <Clock className="h-4 w-4" />
              <span>
                {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Time Remaining</span>
            <span>{Math.round(timeProgress)}%</span>
          </div>
          <Progress 
            value={timeProgress} 
            className={`h-2 transition-colors duration-300 ${
              timeProgress < 20 ? '[&>div]:bg-red-500' : 
              timeProgress < 50 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
            }`}
          />
        </div>
      </div>
    </Card>
  );
}