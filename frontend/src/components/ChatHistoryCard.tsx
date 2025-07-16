import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import type { IContent } from '../types';

interface Props {
  content: IContent[];
}

const ChatHistoryCard: React.FC<Props> = ({ content }) => (
  // reverse the content to show the most recent first
  content.reverse(),
  <div className="chat-history-card">
    <h2>History</h2>
    <div className="history-header">
      <FontAwesomeIcon icon={faBars} className="history-icon" />
    </div>
    {content.length === 0 ? (
      <p className="no-history">No chat history available.</p>
    ) : (
      content.map((item) => (
        <div key={item._id} className="history-item">
          <p>{item.topic}</p>
        </div>
      ))
    )}
  </div>
);

export default ChatHistoryCard;
