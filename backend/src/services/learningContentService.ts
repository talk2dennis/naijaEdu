import LearningContent, { ILearningContent, IQuizQuestion } from "../models/LearningContent";
import { GEMINI_API_KEY, GEMINI_API_BASE_URL } from "../config/env.check";
import { GoogleGenAI } from "@google/genai";


// Initialize Google GenAI client
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });


export const generateExplanation = async (userId: string, topic: string): Promise<ILearningContent> => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured.');
    }

    const prompt = `Explain the topic "${topic}" in a clear and concise paragraph, as if teaching a Nigerian secondary school student. Use simple English, avoid technical jargon, and make the explanation easy to understand.

    If the topic is related to science, mathematics, or coding, provide a practical example using everyday Nigerian context (e.g., food, school, or transport).

    If the topic is abstract (like government, history, or literature), use relatable analogies or comparisons a Nigerian student can understand. Keep the tone friendly and focused on understanding.`;


    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: prompt }] }],
        });
        if (!response || !response.text) {
            throw new Error('AI response for explanation was empty or malformed.');
        }
        // Save the generated explanation to MongoDB
        const newContent = new LearningContent({
            userId,
            topic,
            explanation: response.text,
            quizQuestions: [],
        });
        await newContent.save();
        return newContent;

    } catch (error) {
        console.error('Error generating explanation:', error);
        throw new Error('Failed to generate explanation');
    }

};


// generate quiz content based on the explanation
export const generateQuiz = async (contentId: string, userId: string, explanation: string): Promise<ILearningContent> => {
    if (!GEMINI_API_KEY) {
        throw new Error('Gemini API key is not configured.');
    }

    const quizPrompt = `Based on the following explanation, generate a 5-question multiple-choice quiz.
  For each question, provide the question text, four options (A, B, C, D), and the correct answer letter.
  Format the output as a JSON array of objects, where each object has 'question' (string), 'options' (array of strings), and 'correctAnswer' (string, e.g., "A", "B", "C", or "D").
  Ensure the questions are directly related to the explanation provided:
  Explanation: "${explanation}"`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.0-flash",
            contents: [{ role: "user", parts: [{ text: quizPrompt }] }],
        });
        if (!response || !response.text) {
            throw new Error('AI response for quiz was empty or malformed.');
        }


        // Clean up triple backticks and `json` marker
        let text = response.text.trim();
        if (text.startsWith("```")) {
            text = text.replace(/```json|```/g, "").trim();
        }

        let quizData: IQuizQuestion[];
        try {
            quizData = JSON.parse(text);
        } catch (parseErr) {
            console.error("Failed to parse quiz JSON:", text);
            throw new Error("Quiz output is not valid JSON.");
        }

        if (!Array.isArray(quizData) || quizData.length === 0) {
            throw new Error("Quiz data is empty or not an array.");
        }

        // Update the learning content with parsed quiz questions
        const updatedContent = await LearningContent.findByIdAndUpdate(
            contentId,
            { $set: { quizQuestions: quizData } },
            { new: true }
        );

        if (!updatedContent) {
            throw new Error('Learning content not found or could not be updated.');
        }

        return updatedContent;


    } catch (error) {
        console.error('Error generating quiz:', error);
        throw new Error('Failed to generate quiz');
    }
};

