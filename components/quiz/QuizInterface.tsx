"use client";

import { useEffect, useState } from 'react';
import { useQuiz } from './QuizProvider';
import { QuizHeader } from './QuizHeader';
import { QuestionCard } from './QuestionCard';
import { QuizNavigation } from './QuizNavigation';

export function QuizInterface() {
  const { state, dispatch } = useQuiz();
  const [startTime, setStartTime] = useState<number>(Date.now());

  useEffect(() => {
    if (state.timeRemaining <= 0 && !state.isQuizCompleted) {
      dispatch({ type: 'COMPLETE_QUIZ' });
      dispatch({ type: 'SHOW_RESULTS' });
    }
  }, [state.timeRemaining, state.isQuizCompleted, dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      if (state.isQuizStarted && !state.isQuizCompleted && state.timeRemaining > 0) {
        dispatch({ type: 'UPDATE_TIME', payload: state.timeRemaining - 1 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [state.isQuizStarted, state.isQuizCompleted, state.timeRemaining, dispatch]);

  const handleAnswerSubmit = (answer: string | number) => {
    if (!state.currentQuiz) return;

    const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
    const isCorrect = currentQuestion.correctAnswer === answer;
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);

    dispatch({
      type: 'SUBMIT_ANSWER',
      payload: {
        questionId: currentQuestion.id,
        answer,
        isCorrect,
        timeSpent,
      },
    });
  };

  const handleNext = () => {
    if (state.currentQuestionIndex < (state.currentQuiz?.questions.length || 0) - 1) {
      dispatch({ type: 'NEXT_QUESTION' });
      setStartTime(Date.now());
    } else {
      dispatch({ type: 'COMPLETE_QUIZ' });
      dispatch({ type: 'SHOW_RESULTS' });
    }
  };

  const handlePrevious = () => {
    if (state.currentQuestionIndex > 0) {
      dispatch({ type: 'PREVIOUS_QUESTION' });
      setStartTime(Date.now());
    }
  };

  if (!state.currentQuiz) return null;

  const currentQuestion = state.currentQuiz.questions[state.currentQuestionIndex];
  const currentAnswer = state.answers.find(a => a.questionId === currentQuestion.id);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <div className="container mx-auto px-4 py-6">
        <QuizHeader />
        
        <div className="max-w-4xl mx-auto">
          <QuestionCard
            question={currentQuestion}
            onAnswerSubmit={handleAnswerSubmit}
            selectedAnswer={currentAnswer?.answer}
          />
          
          <QuizNavigation
            onNext={handleNext}
            onPrevious={handlePrevious}
            canGoNext={!!currentAnswer}
            canGoPrevious={state.currentQuestionIndex > 0}
            isLastQuestion={state.currentQuestionIndex === state.currentQuiz.questions.length - 1}
          />
        </div>
      </div>
    </div>
  );
}