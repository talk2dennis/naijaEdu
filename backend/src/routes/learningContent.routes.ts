import { Router } from "express";
import { generateExplanationHandler, generateQuizHandler, getUserContent } from "../controllers/learningContent.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

// Route to generate explanation for a topic
router.post('/generate-explanation', protect, generateExplanationHandler);

// Route to generate quiz for a content
router.post('/generate-quiz/:contentId', protect, generateQuizHandler);

// Route to get user content
router.get('/user-content', protect, getUserContent);

// Export the router
export default router;



/**
 * @swagger
 * tags:
 *   - name: LearningContent
 *     description: Endpoints related to learning content management
 */

/**
 * @swagger
 * /api/ai/generate-explanation:
 *   post:
 *     summary: Generate explanation for a topic
 *     tags: [LearningContent]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               topic:
 *                 type: string
 *                 description: The topic for which to generate an explanation
 *     responses:
 *       201:
 *         description: Explanation generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningContent'
 *       400:
 *         description: Bad request, topic is required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the topic is required
 *       401:
 *         description: Unauthorized, user ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user ID is not found
 */

/**
 * @swagger
 * /api/ai/generate-quiz/{contentId}:
 *   post:
 *     summary: Generate quiz for a content
 *     tags: [LearningContent]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: contentId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the content for which to generate a quiz
 *     responses:
 *       201:
 *         description: Quiz generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LearningContent'
 *       400:
 *         description: Bad request, content ID and explanation are required
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the content ID and explanation are required
 *       401:
 *         description: Unauthorized, user ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user ID is not found
 */

/**
 * @swagger
 * /api/ai/user-content:
 *   get:
 *     summary: Get user content
 *     tags: [LearningContent]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User content retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LearningContent'
 *       401:
 *         description: Unauthorized, user ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user ID is not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     QuizQuestion:
 *       type: object
 *       properties:
 *         question:
 *           type: string
 *           description: The quiz question
 *         options:
 *           type: array
 *           items:
 *             type: string
 *           description: The options for the quiz question
 *         correctAnswer:
 *           type: string
 *           description: The correct answer for the quiz question
 *       required:
 *         - question
 *         - options
 *         - correctAnswer
 *     LearningContent:
 *       type: object
 *       properties:
 *         userId:
 *           type: string
 *           description: The ID of the user who created the content
 *         topic:
 *           type: string
 *           description: The topic of the content
 *         explanation:
 *           type: string
 *           description: The explanation of the content
 *         quizQuestions:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/QuizQuestion'
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the content was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the content was last updated
 *       required:
 *         - userId
 *         - topic
 *         - explanation
 *         - quizQuestions
 *       example:
 *         userId: "60c72b2f9b1e8b001c8e4f3"
 *         topic: "Artificial Intelligence"
 *         explanation: "Artificial Intelligence is the simulation of human intelligence processes by machines, especially computer systems."
 *         quizQuestions:
 *           - question: "What is Artificial Intelligence?"
 *             options:
 *               - "Simulation of human intelligence"
 *               - "A type of computer programming"
 *               - "A new programming language"
 *               - "None of the above"
 *             correctAnswer: "Simulation of human intelligence"
 *         createdAt: "2023-10-01T12:00:00Z"
 *         updatedAt: "2023-10-01T12:00:00Z"
 */
