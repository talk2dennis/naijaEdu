import React from 'react';
import type { IQuizQuestion } from '../types';
import QuizQuestion from './QuizQuestion';

interface Props {
  topic: string;
  questions: IQuizQuestion[];
  userAnswers: { [key: number]: string };
  onAnswer: (index: number, answer: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  showResults: boolean;
  loading: boolean;
}

const QuizSection: React.FC<Props> = ({ topic, questions, userAnswers, onAnswer, onSubmit, onBack, showResults, loading }) => (
  <div className="quiz-section">
    <h2>Quiz for: {topic}</h2>
    {questions.map((q, i) => (
      <QuizQuestion
        key={i}
        index={i}
        question={q}
        selected={userAnswers[i]}
        onAnswer={onAnswer}
        showResults={showResults}
        loading={loading}
      />
    ))}
    <div className="action-buttons">
      <button onClick={onBack} disabled={loading}>Back to Explanation</button>
      {!showResults && <button onClick={onSubmit} disabled={loading}>Submit Quiz</button>}
    </div>
    {showResults && <div className="quiz-submitted">Quiz submitted! Review your answers above.</div>}
  </div>
);

export default QuizSection;
