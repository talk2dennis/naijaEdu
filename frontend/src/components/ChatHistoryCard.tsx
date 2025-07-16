import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import type { IContent } from '../types';

interface Props {
  content: IContent[];
  setSelectedContent: (selectedItem: IContent) => void;
}

const ChatHistoryCard: React.FC<Props> = ({ content, setSelectedContent }) => {
  const [isOpen, setIsOpen] = useState(false);

  // handle click on history item
  const handleHistoryItemClick = (item: IContent) => {
    setSelectedContent(item);
    setIsOpen(false);
  }

  // sort content by date in descending order
  const sortedContent = [...content].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Toggle history visibility
  const toggleHistory = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div className="chat-history-card">
      
      <div className="history-header" onClick={toggleHistory}>
        <FontAwesomeIcon icon={faBars} className="history-icon" />
      </div>
      {/* <h2>History</h2> */}
      {sortedContent.length === 0 ? (
        <div className={`no-history${isOpen ? " chat-visible" : ""}`}>
          <FontAwesomeIcon icon={faBars} className="history-icon faded" />
          <p>No chat history available.</p>
        </div>
      ) : (
        sortedContent.map((item, index) => (
          <div
            key={index}
            className={`history-item${isOpen ? " chat-visible" : ""}`}
            onClick={() => handleHistoryItemClick(item)}
          >
            <p>{item.topic}</p>
          </div>
        ))
      )}
    </div>
  )
};

export default ChatHistoryCard;
