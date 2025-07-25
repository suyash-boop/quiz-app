"use client";

import { useState } from 'react';
import { QuizProvider } from '@/components/quiz/QuizProvider';
import { QuizApp } from '@/components/quiz/QuizApp';

export default function Home() {
  return (
    <QuizProvider>
      <QuizApp />
    </QuizProvider>
  );
}