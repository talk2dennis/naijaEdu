import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { IContent } from '../types';
import Share from './Share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';

interface Props {
  content: IContent;
  onBack: () => void;
  onNext: () => void;
  disabled: boolean;
}

const ExplanationSection: React.FC<Props> = ({ content, onBack, onNext, disabled }) => {
  if (!content || !content.explanation) {
    return <div className="error">No explanation available.</div>;
  }

  // seak function
  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    speechSynthesis.speak(utterance);
  }

  // get the url of the current page
  const url = window.location.href;
  return (
    <div className="explanation-section">
      <h2>Explanation for: {content.topic}</h2>
      <div className="explanation-box">
        <div className='share-section'>
          <Share url={url} explanation={content.explanation} />
        </div>
        <div className="audio-button" onClick={() => speak(content.explanation)}>
          <FontAwesomeIcon icon={faVolumeUp} size="lg" />
        </div>
        <ReactMarkdown>{content.explanation}</ReactMarkdown>
      </div>
      <div className="action-buttons">
        <button onClick={onBack} disabled={disabled}>Go Back</button>
        <button onClick={onNext} disabled={disabled}>Generate Quiz</button>
      </div>
    </div>
  )
};

export default ExplanationSection;
