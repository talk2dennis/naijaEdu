import React from 'react';
import type { IQuizQuestion } from '../types';

interface Props {
  index: number;
  question: IQuizQuestion;
  selected?: string;
  onAnswer: (index: number, answer: string) => void;
  showResults: boolean;
  loading: boolean;
}

const QuizQuestion: React.FC<Props> = ({ index, question, selected, onAnswer, showResults, loading }) => {
  const isCorrect = showResults && selected === question.correctAnswer;
  const isIncorrect = showResults && selected && !isCorrect;

  return (
    <div className={`question-card ${isCorrect ? 'correct' : isIncorrect ? 'incorrect' : ''}`}>
      <p className="question-text">{index + 1}. {question.question}</p>
      <div className="options">
        {question.options.map((opt, i) => {
          const optLetter = String.fromCharCode(65 + i);
          const isSelected = selected === optLetter;
          const isRight = showResults && optLetter === question.correctAnswer;

          let classes = 'option';
          if (showResults) {
            if (isRight) classes += ' correct-option';
            else if (isSelected) classes += ' incorrect-option';
          } else if (isSelected) {
            classes += ' selected';
          }

          return (
            <label key={i} className={classes}>
              <input
                type="radio"
                name={`question-${index}`}
                value={optLetter}
                checked={isSelected}
                onChange={() => onAnswer(index, optLetter)}
                disabled={showResults || loading}
              />
              <span>{opt}</span>
            </label>
          );
        })}
      </div>
      {showResults && (
        <p className={`feedback ${isCorrect ? 'text-green' : 'text-red'}`}>
          {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${question.correctAnswer}`}
        </p>
      )}
    </div>
  );
};

export default QuizQuestion;
