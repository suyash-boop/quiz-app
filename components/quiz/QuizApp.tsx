"use client";

import { useQuiz } from './QuizProvider';
import { CategorySelection } from './CategorySelection';
import { QuizInterface } from './QuizInterface';
import { ResultsScreen } from './ResultsScreen';

export function QuizApp() {
  const { state } = useQuiz();

  if (state.showResults) {
    return <ResultsScreen />;
  }

  if (state.isQuizStarted && state.currentQuiz) {
    return <QuizInterface />;
  }

  return <CategorySelection />;
}