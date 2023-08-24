import express from 'express'

import { validateResource } from '../middleware/validate.middleware'
import { isAuth, isAdmin } from '../middleware/auth.middleware'
import {
  GetUsersRequestSchema,
  GetUserRequestSchema,
  PostUserCreateSchema,
  PostUserLoginSchema,
  PatchUserRequestSchema,
  DeleteUserRequestSchema,
} from '../schema/user.schema'
import {
  getAllUsers,
  getSingleUser,
  register,
  login,
  updateUser,
  deleteUser,
  getCurrentUser,
} from '../controller/user.controller'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: users
 *   description: API for managing users.
 */

/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [users]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Filter users by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of users to return
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Number of users to skip from the beginning
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  isAuth,
  isAdmin,
  validateResource(GetUsersRequestSchema),
  getAllUsers,
)

/**
 * @swagger
 * /users/me:
 *   get:
 *     summary: Get current user
 *     tags: [users]
 *     security:
 *        - token: []
 *     responses:
 *       200:
 *         description: Successfully fetched current user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       500:
 *         description: Internal server error.
 */
router.get('/me', isAuth, getCurrentUser)

/**
 * @swagger
 * /users/{id}:
 *   get:
 *     summary: Get a single user by ID
 *     tags: [users]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the user.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       404:
 *         description: User with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(GetUserRequestSchema),
  getSingleUser,
)

/**
 * @swagger
 * /users/register:
 *   post:
 *     summary: Register a new user
 *     tags: [users]
 *     requestBody:
 *       description: User object to be registered
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: example
 *               email: example@example.com
 *               password: password123
 *               role: CUSTOMER
 *     responses:
 *       200:
 *         description: Successfully registered the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: Register Success
 *       500:
 *         description: Internal server error.
 */
router.post('/register', validateResource(PostUserCreateSchema), register)

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in as a user
 *     tags: [users]
 *     requestBody:
 *       description: User credentials for login
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               shouldValidAdmin:
 *                 type: boolean
 *             example:
 *               email: user@user.com
 *               password: user
 *               shouldValidAdmin: false
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Authentication failed.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', validateResource(PostUserLoginSchema), login)

/**
 * @swagger
 * /users/{id}:
 *   put:
 *     summary: Update a user by ID
 *     tags: [users]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to update
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: User object with updated fields
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               role:
 *                 type: string
 *             example:
 *               username: example
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: User updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 objectId:
 *                   type: string
 *               example:
 *                 msg: User updated
 *                 objectId: 1234567890
 *       500:
 *         description: Internal server error.
 */
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchUserRequestSchema),
  updateUser,
)
router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchUserRequestSchema),
  updateUser,
)

/**
 * @swagger
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID
 *     tags: [users]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the user to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: User deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: User Deleted
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteUserRequestSchema),
  deleteUser,
)

export = router

// Define the User schema here if not already defined in the models.
// Replace `type: object` with the actual User schema.
// This schema will be referenced in the Swagger JSDoc comments.

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         username:
 *           type: string
 *         email:
 *           type: string
 *       example:
 *         _id: 1234567890
 *         username: JohnDoe
 *         email: johndoe@example.com
 */
