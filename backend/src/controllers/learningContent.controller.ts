import { Request, Response, NextFunction } from "express";
import LearningContent from "../models/LearningContent";
import { generateExplanation, generateQuiz } from "../services/learningContentService";


export const generateExplanationHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { topic } = req.body;
    const userId = req.user?.id

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' });
      return;
    }
    if (!topic) {
      res.status(400).json({ message: 'Topic is required to generate an explanation.' });
      return;
    }
    const content = await generateExplanation(userId, topic);
    res.status(201).json(content);
  } catch (error) {
    console.error('Error generating explanation:', error);
    next(error);
  }
};


export const generateQuizHandler = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { contentId } = req.params;
    const userId = req.user?.id;

    const contentDoc = await LearningContent.findById(contentId);
    const explanation = contentDoc?.explanation;

    if (!userId) {
      res.status(401).json({ message: 'Unauthorized: User ID not found.' });
      return;
    }

    if (!contentId || !explanation) {
      res.status(400).json({ message: 'Content ID and explanation are required to generate a quiz.' });
      return;
    }

    const content = await generateQuiz(contentId, userId, explanation);
    res.status(201).json(content);
  } catch (error) {
    console.error('Error generating quiz:', error);
    next(error);
  }
};


// get user content
export const getUserContent = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user?.id;

    const content = await LearningContent.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getUserContent:', error);
    next(error);
  }
};


// get content with id
export const getContentById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { id } = req.params;
    if (!id) {
      res.status(400).json({ message: 'Content ID is required.' });
      return;
    }

    const content = await LearningContent.findById(id);
    if (!content) {
      res.status(404).json({ message: 'Content not found.' });
      return;
    }
    res.status(200).json(content);
  } catch (error) {
    console.error('Error in getContentById:', error);
    next(error);
  }
};