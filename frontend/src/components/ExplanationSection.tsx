import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { IContent } from '../types';

interface Props {
  content: IContent;
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
}

const ExplanationSection: React.FC<Props> = ({ content, onBack, onNext, disabled }) => (
  <div className="explanation-section">
    <h2>Explanation for: {content.topic}</h2>
    <div className="explanation-box">
      <ReactMarkdown>{content.explanation}</ReactMarkdown>
    </div>
    <div className="action-buttons">
      <button onClick={onBack} disabled={disabled}>Go Back</button>
      <button onClick={onNext} disabled={disabled}>Generate Quiz</button>
    </div>
  </div>
);

export default ExplanationSection;
