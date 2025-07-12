import { Router } from "express";
import { updateUserById, getUserById, getAllUsers, deleteUserById } from "../controllers/auth.controller";
import { getUserValidation, updateValidation, deleteUserValidation } from "../validators/auth.validator";
import { validateRequest } from "../middleware/validation.middleware";
import { protect } from "../middleware/auth.middleware";

const userRouter = Router();

// get all users
userRouter.get("/", protect, getAllUsers);

// get user by id
userRouter.get(
    '/:id',
    getUserValidation,
    validateRequest,
    protect,
    getUserById
);

// update user by id
userRouter.put(
    '/:id',
    updateValidation,
    validateRequest,
    protect,
    updateUserById
);

// delete a user
userRouter.delete(
    '/:id',
    deleteUserValidation,
    validateRequest,
    protect,
    deleteUserById
);



// Export the user router
export default userRouter;


//// Swagger documentation for user routes
/**
 * @swagger
 * tags:
 *   - name: Users
 *     description: Endpoints related to user management and social actions
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Get all users
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of users
 *       401:
 *         description: Unauthorized
 */

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the user
 *     responses:
 *       200:
 *         description: User object
 *       404:
 *         description: User not found
 *
 *   put:
 *     summary: Update a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Updated user data
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: newUsername
 *               email:
 *                 type: string
 *                 example: newemail@example.com
 *     responses:
 *       200:
 *         description: User updated
 *       400:
 *         description: Validation error
 *       404:
 *         description: User not found
 *
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       204:
 *         description: User deleted successfully
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 */
