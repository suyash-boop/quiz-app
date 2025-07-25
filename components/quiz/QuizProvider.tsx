"use client";

import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Question {
  id: number;
  question: string;
  type: 'multiple-choice' | 'true-false';
  options?: string[];
  correctAnswer: string | number;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  category: string;
  questions: Question[];
  timeLimit: number; // in seconds
  color: string;
}

interface Answer {
  questionId: number;
  answer: string | number;
  isCorrect: boolean;
  timeSpent: number;
}

interface QuizState {
  currentQuiz: Quiz | null;
  currentQuestionIndex: number;
  answers: Answer[];
  timeRemaining: number;
  isQuizStarted: boolean;
  isQuizCompleted: boolean;
  score: number;
  showResults: boolean;
}

type QuizAction =
  | { type: 'START_QUIZ'; payload: Quiz }
  | { type: 'NEXT_QUESTION' }
  | { type: 'PREVIOUS_QUESTION' }
  | { type: 'SUBMIT_ANSWER'; payload: Answer }
  | { type: 'UPDATE_TIME'; payload: number }
  | { type: 'COMPLETE_QUIZ' }
  | { type: 'RESET_QUIZ' }
  | { type: 'SHOW_RESULTS' };

const initialState: QuizState = {
  currentQuiz: null,
  currentQuestionIndex: 0,
  answers: [],
  timeRemaining: 0,
  isQuizStarted: false,
  isQuizCompleted: false,
  score: 0,
  showResults: false,
};

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'START_QUIZ':
      return {
        ...state,
        currentQuiz: action.payload,
        isQuizStarted: true,
        timeRemaining: action.payload.timeLimit,
        currentQuestionIndex: 0,
        answers: [],
        isQuizCompleted: false,
        showResults: false,
        score: 0,
      };
    case 'NEXT_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.min(
          state.currentQuestionIndex + 1,
          (state.currentQuiz?.questions.length || 1) - 1
        ),
      };
    case 'PREVIOUS_QUESTION':
      return {
        ...state,
        currentQuestionIndex: Math.max(state.currentQuestionIndex - 1, 0),
      };
    case 'SUBMIT_ANSWER':
      const newAnswers = [...state.answers];
      const existingIndex = newAnswers.findIndex(
        (a) => a.questionId === action.payload.questionId
      );
      
      if (existingIndex >= 0) {
        newAnswers[existingIndex] = action.payload;
      } else {
        newAnswers.push(action.payload);
      }
      
      return {
        ...state,
        answers: newAnswers,
      };
    case 'UPDATE_TIME':
      return {
        ...state,
        timeRemaining: Math.max(0, action.payload),
      };
    case 'COMPLETE_QUIZ':
      const correctAnswers = state.answers.filter((a) => a.isCorrect).length;
      const totalQuestions = state.currentQuiz?.questions.length || 1;
      
      return {
        ...state,
        isQuizCompleted: true,
        score: Math.round((correctAnswers / totalQuestions) * 100),
      };
    case 'SHOW_RESULTS':
      return {
        ...state,
        showResults: true,
      };
    case 'RESET_QUIZ':
      return initialState;
    default:
      return state;
  }
}

interface QuizContextType {
  state: QuizState;
  dispatch: React.Dispatch<QuizAction>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState);

  return (
    <QuizContext.Provider value={{ state, dispatch }}>
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}