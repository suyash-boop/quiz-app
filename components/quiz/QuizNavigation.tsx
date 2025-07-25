"use client";

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, CheckCircle } from 'lucide-react';

interface QuizNavigationProps {
  onNext: () => void;
  onPrevious: () => void;
  canGoNext: boolean;
  canGoPrevious: boolean;
  isLastQuestion: boolean;
}

export function QuizNavigation({
  onNext,
  onPrevious,
  canGoNext,
  canGoPrevious,
  isLastQuestion,
}: QuizNavigationProps) {
  return (
    <div className="flex items-center justify-between mt-8">
      <Button
        variant="outline"
        onClick={onPrevious}
        disabled={!canGoPrevious}
        className="flex items-center gap-2"
      >
        <ChevronLeft className="h-4 w-4" />
        Previous
      </Button>

      <Button
        onClick={onNext}
        disabled={!canGoNext}
        className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
      >
        {isLastQuestion ? (
          <>
            <CheckCircle className="h-4 w-4" />
            Finish Quiz
          </>
        ) : (
          <>
            Next
            <ChevronRight className="h-4 w-4" />
          </>
        )}
      </Button>
    </div>
  );
}