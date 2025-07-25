"use client";

import { useQuiz } from './QuizProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Clock, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

export function ResultsScreen() {
  const { state, dispatch } = useQuiz();

  if (!state.currentQuiz) return null;

  const totalQuestions = state.currentQuiz.questions.length;
  const correctAnswers = state.answers.filter(a => a.isCorrect).length;
  const incorrectAnswers = totalQuestions - correctAnswers;
  const averageTime = state.answers.reduce((acc, a) => acc + a.timeSpent, 0) / state.answers.length;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreMessage = (score: number) => {
    if (score >= 90) return 'Outstanding! 🏆';
    if (score >= 80) return 'Great job! 🎉';
    if (score >= 70) return 'Good work! 👍';
    if (score >= 60) return 'Not bad! 👌';
    return 'Keep practicing! 💪';
  };

  const handleRetake = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  const handleBackToHome = () => {
    dispatch({ type: 'RESET_QUIZ' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="bg-gradient-to-r from-green-500 to-blue-500 p-4 rounded-full shadow-lg">
                <Trophy className="h-12 w-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold mb-2">Quiz Complete!</h1>
            <p className="text-lg text-muted-foreground">
              {getScoreMessage(state.score)}
            </p>
          </div>

          {/* Score Overview */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader className="text-center pb-4">
              <CardTitle className="text-2xl mb-2">{state.currentQuiz.title}</CardTitle>
              <div className={`text-6xl font-bold ${getScoreColor(state.score)} mb-4`}>
                {state.score}%
              </div>
              <Progress value={state.score} className="h-3" />
            </CardHeader>
            
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
                  <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-600">{correctAnswers}</div>
                  <div className="text-sm text-green-700">Correct</div>
                </div>
                
                <div className="text-center p-4 bg-red-50 rounded-lg border border-red-200">
                  <XCircle className="h-8 w-8 text-red-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-600">{incorrectAnswers}</div>
                  <div className="text-sm text-red-700">Incorrect</div>
                </div>
                
                <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <Clock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-600">{Math.round(averageTime)}s</div>
                  <div className="text-sm text-blue-700">Avg. Time</div>
                </div>
                
                <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <Trophy className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-600">{totalQuestions}</div>
                  <div className="text-sm text-purple-700">Total</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Question Review */}
          <Card className="mb-8 bg-white/80 backdrop-blur-sm border-0 shadow-lg">
            <CardHeader>
              <CardTitle>Question Review</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {state.currentQuiz.questions.map((question, index) => {
                  const userAnswer = state.answers.find(a => a.questionId === question.id);
                  const isCorrect = userAnswer?.isCorrect ?? false;
                  
                  return (
                    <div 
                      key={question.id}
                      className={`p-4 rounded-lg border ${
                        isCorrect 
                          ? 'bg-green-50 border-green-200' 
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">Q{index + 1}.</span>
                          <Badge variant={isCorrect ? 'default' : 'destructive'}>
                            {isCorrect ? 'Correct' : 'Incorrect'}
                          </Badge>
                        </div>
                        <Badge variant="outline">
                          {question.difficulty}
                        </Badge>
                      </div>
                      
                      <p className="text-sm font-medium mb-2">{question.question}</p>
                      
                      {!isCorrect && (
                        <div className="text-xs text-muted-foreground mt-2 p-2 bg-white/50 rounded">
                          <strong>Explanation:</strong> {question.explanation}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={handleRetake}
              size="lg"
              className="flex items-center gap-2"
            >
              <RotateCcw className="h-5 w-5" />
              Retake Quiz
            </Button>
            
            <Button 
              onClick={handleBackToHome}
              variant="outline"
              size="lg"
              className="flex items-center gap-2"
            >
              <Home className="h-5 w-5" />
              Back to Home
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}