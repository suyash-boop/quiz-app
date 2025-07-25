"use client";

import { useState } from 'react';
import { Question } from './QuizProvider';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

interface QuestionCardProps {
  question: Question;
  onAnswerSubmit: (answer: string | number) => void;
  selectedAnswer?: string | number;
}

export function QuestionCard({ question, onAnswerSubmit, selectedAnswer }: QuestionCardProps) {
  const [localAnswer, setLocalAnswer] = useState<string | number>(selectedAnswer ?? '');

  const handleAnswerChange = (value: string | number) => {
    setLocalAnswer(value);
    onAnswerSubmit(value);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="mb-6 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between mb-4">
          <Badge 
            variant="outline" 
            className={`${getDifficultyColor(question.difficulty)} border`}
          >
            {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
          </Badge>
          <Badge variant="secondary">
            {question.type === 'multiple-choice' ? 'Multiple Choice' : 'True/False'}
          </Badge>
        </div>
        
        <h2 className="text-xl font-semibold leading-relaxed text-gray-900 dark:text-gray-100">
          {question.question}
        </h2>
      </CardHeader>

      <CardContent>
        {question.type === 'multiple-choice' && question.options ? (
          <RadioGroup
            value={localAnswer.toString()}
            onValueChange={(value) => handleAnswerChange(parseInt(value))}
            className="space-y-3"
          >
            {question.options.map((option, index) => (
              <div 
                key={index}
                className={`flex items-center space-x-3 p-4 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-blue-200 hover:bg-blue-50/50 ${
                  localAnswer === index 
                    ? 'border-blue-500 bg-blue-50 shadow-sm' 
                    : 'border-gray-200 bg-white/50'
                }`}
                onClick={() => handleAnswerChange(index)}
              >
                <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                <Label 
                  htmlFor={`option-${index}`} 
                  className="flex-1 cursor-pointer text-sm font-medium"
                >
                  {option}
                </Label>
              </div>
            ))}
          </RadioGroup>
        ) : (
          <div className="space-y-3">
            <div 
              className={`flex items-center justify-center p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-green-200 hover:bg-green-50/50 ${
                localAnswer === 'true' 
                  ? 'border-green-500 bg-green-50 shadow-sm' 
                  : 'border-gray-200 bg-white/50'
              }`}
              onClick={() => handleAnswerChange('true')}
            >
              <Button
                variant={localAnswer === 'true' ? 'default' : 'outline'}
                size="lg"
                className="w-32 font-semibold"
              >
                True
              </Button>
            </div>
            
            <div 
              className={`flex items-center justify-center p-6 rounded-lg border-2 transition-all duration-300 cursor-pointer hover:border-red-200 hover:bg-red-50/50 ${
                localAnswer === 'false' 
                  ? 'border-red-500 bg-red-50 shadow-sm' 
                  : 'border-gray-200 bg-white/50'
              }`}
              onClick={() => handleAnswerChange('false')}
            >
              <Button
                variant={localAnswer === 'false' ? 'default' : 'outline'}
                size="lg"
                className="w-32 font-semibold"
              >
                False
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}