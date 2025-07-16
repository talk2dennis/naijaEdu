import React from 'react';
import type { IQuizQuestion } from '../types';
import QuizQuestion from './QuizQuestion';
import Celebration from './Celebration';

interface Props {
  topic: string;
  questions: IQuizQuestion[];
  userAnswers: { [key: number]: string };
  onAnswer: (index: number, answer: string) => void;
  onSubmit: () => void;
  onBack: () => void;
  showResults: boolean;
  setShowQuizResults?: (show: boolean) => void;
  loading: boolean;
  score?: number | null;
}

const QuizSection: React.FC<Props> = ({ topic, questions, userAnswers, onAnswer, onSubmit, onBack, showResults, loading, score, setShowQuizResults }) => {

  // handle toggle for quiz results
  const handleToggleResults = () => {
    if (setShowQuizResults) {
      setShowQuizResults(!showResults);
    }
  };

  return (
  <div className="quiz-section">
    <h2>Quiz for: {topic}</h2>

    {showResults && score !== null && score !== undefined && score > 70 && <Celebration />}
    {showResults &&
      <div className="quiz-score" onClick={handleToggleResults}>
        <div className='score'>
          Your score: {score !== null ? `${score}%` : 'N/A'}
        </div>
      </div>}
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
)};

export default QuizSection;
