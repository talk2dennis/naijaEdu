import React from 'react';
import ReactMarkdown from 'react-markdown';
import type { IContent } from '../types';
import Share from './Share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeUp, faStop } from '@fortawesome/free-solid-svg-icons';

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

  let currentUtterance: SpeechSynthesisUtterance | null = null;

  // helper function to remove markdown syntax
  const removeMarkdownSyntax = (text: string) => {
    return text.replace(/[#*`~_]/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  }

  // speak function
  const speak = (text: string) => {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
    }
    const utterance = new SpeechSynthesisUtterance(removeMarkdownSyntax(text));
    // use nigeria english accent is available
    utterance.lang = 'en-UK';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    currentUtterance = utterance;
    speechSynthesis.speak(utterance);
  }

  // handle stop speaking
  const stopSpeaking = () => {
    if (currentUtterance) {
      speechSynthesis.cancel();
      currentUtterance = null;
    }
  }

  // get the url of the current page
  const url = window.location.href;
  return (
    <div className="explanation-section">
      <h2>Explanation for: {content.topic}</h2>
      <div className="explanation-box">
        <div className='share-section'>
          <Share url={url} explanation={removeMarkdownSyntax(content.explanation)} />
        </div>
        <div className="audio-button">
          <FontAwesomeIcon onClick={() => speak(content.explanation)} icon={faVolumeUp} size="lg" />
          <FontAwesomeIcon onClick={stopSpeaking} icon={faStop} size="lg" />
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
