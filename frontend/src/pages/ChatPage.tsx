import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import type { IContent, IQuizQuestion } from '../types';
import ReactMarkdown from 'react-markdown';
import Loading from '../components/Loading';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './css/ChatPage.css';

type LearningPage = 'topicInput' | 'explanationDisplay' | 'quizDisplay';

const ChatPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<LearningPage>('topicInput');
    const [topicInput, setTopicInput] = useState('');
    const [learningContent, setLearningContent] = useState<IContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [showQuizResults, setShowQuizResults] = useState(false);

    const { user, setUser, toast } = useAuth();

    const handleUpdateUser = (content: IContent) => {
        if (!user) return;

        // Update user content
        const updatedContent = [...user.content, content];
        setUser({ ...user, content: updatedContent });
    };



    const handleGetExplanation = async () => {
        const trimmedTopic = topicInput.trim();
        if (!trimmedTopic || trimmedTopic.length < 3) {
            toast('Please enter a valid topic with at least 3 characters.', 'error');
            setError('Please enter a valid topic with at least 3 characters.');
            return;
        }

        setLoading(true);
        setTopicInput('');
        setError('');
        setLearningContent(null);
        setUserAnswers({});
        setShowQuizResults(false);

        try {
            const response = await axiosClient.post<IContent>('/ai/generate-explanation', { topic: trimmedTopic });
            setLearningContent(response.data);
            setCurrentPage('explanationDisplay');
        } catch (err: any) {
            console.error('Error generating explanation:', err);
            toast('Failed to generate explanation. Please try again.', 'error');
            setError(err.response?.data?.message || 'Failed to generate explanation. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleGenerateQuiz = async () => {
        if (!learningContent?.explanation) {
            toast('No explanation available to generate a quiz for.', 'error');
            setError('No explanation available to generate a quiz for.');
            return;
        }

        setLoading(true);
        setError('');
        setUserAnswers({});
        setShowQuizResults(false);

        try {
            const response = await axiosClient.post<IContent>(`/ai/generate-quiz/${learningContent._id}`);
            if (!response.data.quizQuestions?.length) {
                throw new Error('No quiz questions generated.');
            }

            setLearningContent(response.data);
            handleUpdateUser(response.data);
            setCurrentPage('quizDisplay');
        } catch (err: any) {
            console.error('Error generating quiz:', err);
            toast('Failed to generate quiz. Please try again.', 'error');
            setError(err.response?.data?.message || 'Failed to generate quiz. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleAnswerChange = (index: number, option: string) => {
        setUserAnswers(prev => ({ ...prev, [index]: option }));
    };

    const handleSubmitQuiz = () => {
        setShowQuizResults(true);
    };

    const renderQuizQuestion = (q: IQuizQuestion, index: number) => {
        const isAnswered = userAnswers[index] !== undefined;
        const isCorrect = showQuizResults && userAnswers[index] === q.correctAnswer;
        const isIncorrect = showQuizResults && isAnswered && !isCorrect;


        // loading
        if (loading) {
            return <Loading title='Loading...' />;
        }

        return (
            <div key={index} className={`question-card ${isCorrect ? 'correct' : isIncorrect ? 'incorrect' : ''}`}>
                <p className="question-text">{index + 1}. {q.question}</p>
                <div className="options">
                    {q.options.map((opt, i) => {
                        const optLetter = String.fromCharCode(65 + i);
                        const isSelected = userAnswers[index] === optLetter;
                        const isRight = showQuizResults && optLetter === q.correctAnswer;

                        let classes = 'option';
                        if (showQuizResults) {
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
                                    onChange={() => handleAnswerChange(index, optLetter)}
                                    disabled={showQuizResults || loading}
                                />
                                <span>{optLetter}. {opt}</span>
                            </label>
                        );
                    })}
                </div>
                {showQuizResults && (
                    <p className={`feedback ${isCorrect ? 'text-green' : 'text-red'}`}>
                        {isCorrect ? 'Correct!' : `Incorrect. Correct answer: ${q.correctAnswer}`}
                    </p>
                )}
            </div>
        );
    };

    return (
        <div className="chat-page-container">
            {/* chathistory card */}
            <div className="chat-history-card">
                <h2>History</h2>
                <div className="history-header">
                    <FontAwesomeIcon icon={faBars} className="history-icon" />
                </div>
                {user?.content.length === 0 ? (
                    <p className="no-history">No chat history available.</p>
                ) : (
                    user?.content.map((content) => (
                        <div>
                            <div key={content._id} className="history-item">
                                <p>{content.topic}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
            <div className="chat-card">
                {/* <h1 className="chat-title">NaijaEdu Learning Path</h1> */}

                {/* {loading && <div className="loading">Processing your request...</div>} */}
                {error && <div className="error-message">{error}</div>}

                {currentPage === 'topicInput' && (
                    <div className="topic-input-section">
                        <label htmlFor="topic">What topic would you like to learn today?</label>
                        <input
                            id="topic"
                            type="text"
                            value={topicInput}
                            onChange={(e) => setTopicInput(e.target.value)}
                            placeholder="e.g., Photosynthesis, Nigerian History"
                            disabled={loading}
                        />
                        <button onClick={handleGetExplanation} disabled={loading}>Get Explanation</button>
                    </div>
                )}

                {currentPage === 'explanationDisplay' && learningContent && (
                    <div className="explanation-section">
                        <h2>Explanation for: {learningContent.topic}</h2>
                        <div className="explanation-box">
                            <ReactMarkdown>{learningContent.explanation}</ReactMarkdown>
                        </div>
                        <div className="action-buttons">
                            <button onClick={() => setCurrentPage('topicInput')} disabled={loading}>Go Back</button>
                            <button onClick={handleGenerateQuiz} disabled={loading}>Generate Quiz</button>
                        </div>
                    </div>
                )}

                {currentPage === 'quizDisplay' && (learningContent?.quizQuestions?.length ?? 0) > 0 && (
                    <div className="quiz-section">
                        <h2>Quiz for: {learningContent?.topic}</h2>
                        {learningContent?.quizQuestions.map(renderQuizQuestion)}
                        <div className="action-buttons">
                            <button onClick={() => {
                                setCurrentPage('explanationDisplay');
                                setUserAnswers({});
                                setShowQuizResults(false);
                            }} disabled={loading}>Back to Explanation</button>
                            {!showQuizResults && (
                                <button onClick={handleSubmitQuiz} disabled={loading}>Submit Quiz</button>
                            )}
                        </div>
                        {showQuizResults && <div className="quiz-submitted">Quiz submitted! Review your answers above.</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatPage;
