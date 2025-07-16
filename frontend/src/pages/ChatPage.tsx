import React, { useState } from 'react';
import axiosClient from '../api/axiosClient';
import { useAuth } from '../contexts/AuthContext';
import type { IContent } from '../types';
import Loading from '../components/Loading';
import './css/ChatPage.css';
import QuizSection from '../components/QuizSection';
import ExplanationSection from '../components/ExplanationSection';
import ChatHistoryCard from '../components/ChatHistoryCard';



type LearningPage = 'topicInput' | 'explanationDisplay' | 'quizDisplay';

const ChatPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<LearningPage>('topicInput');
    const [topicInput, setTopicInput] = useState('');
    const [learningContent, setLearningContent] = useState<IContent | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [userAnswers, setUserAnswers] = useState<{ [key: number]: string }>({});
    const [showQuizResults, setShowQuizResults] = useState(false);
    const [score, setScore] = useState<number | null>(null);

    const { user, setUser, toast, logout } = useAuth();

    const handleUpdateUser = (content: IContent) => {
        if (!user) return;

        // check if content already exists
        const existingContent = user.content.find(c => c._id === content._id);
        if (existingContent) return

        // Update user content
        const updatedContent = [...user.content, content];
        setUser({ ...user, content: updatedContent, });
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
        setScore(null);

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

        // check if quiz questions already exist
        if (learningContent.quizQuestions && learningContent.quizQuestions.length > 0) {
            toast('Quiz already generated for this topic.', 'success');
            setCurrentPage('quizDisplay');
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
            if (err.response?.data.message?.includes('token expired')) {
                toast('Session expired. Please log in again.', 'error');
                logout();
            }
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

    // calculate score
    const handleSubmitQuiz = () => {
        if (!learningContent?.quizQuestions) return 0;
        const correctAnswers = learningContent.quizQuestions.filter((q, index) => userAnswers[index] === q.correctAnswer).length;
        const score = Math.round((correctAnswers / learningContent.quizQuestions.length) * 100);
        const messageType = score >= 70 ? 'success' : 'error';
        toast(`Your score: ${score}%`, messageType);
        setShowQuizResults(true);
        setScore(score);
    };



    // handle content selection from history
    const handleSelectedContent = (selectedItem: IContent | null) => {
        if (selectedItem) {
            setLearningContent(selectedItem);
            setCurrentPage('explanationDisplay');
            setUserAnswers({});
            setShowQuizResults(false);
        } else {
            setLearningContent(null);
            setCurrentPage('topicInput');
            setUserAnswers({});
            setShowQuizResults(false);
        }
    };

    // loading
    if (loading) {
        return <Loading title='loading content' />;
    }


    // const renderQuizQuestion = (q: IQuizQuestion, index: number) => {
    //     const isAnswered = userAnswers[index] !== undefined;
    //     const isCorrect = showQuizResults && userAnswers[index] === q.correctAnswer;
    //     const isIncorrect = showQuizResults && isAnswered && !isCorrect;


    //     return (
    //         <QuizQuestion
    //             key={index}
    //             index={index}
    //             question={q}
    //             selected={userAnswers[index]}
    //             onAnswer={handleAnswerChange}
    //             showResults={showQuizResults}
    //             loading={loading}
    //         />
    //     );
    // };

    return (
        <div className="chat-page-container">
            {/* chathistory card */}
            <ChatHistoryCard
                content={user?.content || []}
                setSelectedContent={handleSelectedContent}
            />

            {/* main chat card */}
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
                    <ExplanationSection
                        content={learningContent}
                        onBack={() => setCurrentPage('topicInput')}
                        onNext={handleGenerateQuiz}
                        disabled={loading}
                    />
                )}

                {currentPage === 'quizDisplay' && (learningContent?.quizQuestions?.length ?? 0) > 0 && learningContent && (
                    <QuizSection
                        topic={learningContent.topic}
                        questions={learningContent.quizQuestions}
                        userAnswers={userAnswers}
                        onAnswer={handleAnswerChange}
                        onSubmit={handleSubmitQuiz}
                        onBack={() => setCurrentPage('explanationDisplay')}
                        showResults={showQuizResults}
                        loading={loading}
                        score={score}
                        setShowQuizResults={setShowQuizResults}
                    />
                )}
            </div>
        </div>
    );
};

export default ChatPage;
