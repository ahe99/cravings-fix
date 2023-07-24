import express from 'express'
const router = express.Router()

import { validateResource } from '../middleware/validate'
import {
  GetAdminsRequestSchema,
  GetAdminRequestSchema,
  PostAdminCreateSchema,
  PostAdminLoginSchema,
  PatchAdminRequestSchema,
  DeleteAdminRequestSchema,
} from '../schema/admin'
import {
  getAllAdmins,
  getSingleAdmin,
  register,
  login,
  updateAdmin,
  deleteAdmin,
  getCurrentAdmin,
} from '../controller/admin'
import { isAdmin } from '../middleware/auth'

/**
 * @swagger
 * tags:
 *   name: admins
 *   description: API for managing admins.
 */

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Get all admins
 *     tags: [admins]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Filter admins by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of admins to return
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Number of admins to skip from the beginning
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched admins.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateResource(GetAdminsRequestSchema), getAllAdmins)

/**
 * @swagger
 * /admins/me:
 *   get:
 *     summary: Get current admin
 *     tags: [admins]
 *     security:
 *        - token: []
 *     responses:
 *       200:
 *         description: Successfully fetched current admin.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Internal server error.
 */
router.get('/me', isAdmin, getCurrentAdmin)

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Get a single admin by ID
 *     tags: [admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the admin.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: Admin with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', validateResource(GetAdminRequestSchema), getSingleAdmin)

/**
 * @swagger
 * /admins/register:
 *   post:
 *     summary: Register a new admin
 *     tags: [admins]
 *     requestBody:
 *       description: Admin object to be registered
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
 *             example:
 *               username: example
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully registered the admin.
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
router.post('/register', validateResource(PostAdminCreateSchema), register)

/**
 * @swagger
 * /admins/login:
 *   post:
 *     summary: Log in as a admin
 *     tags: [admins]
 *     requestBody:
 *       description: Admin credentials for login
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
 *             example:
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Successfully logged in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       401:
 *         description: Authentication failed.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', validateResource(PostAdminLoginSchema), login)

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Update a admin by ID
 *     tags: [admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin to update
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: Admin object with updated fields
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
 *             example:
 *               username: example
 *               email: example@example.com
 *               password: password123
 *     responses:
 *       200:
 *         description: Admin updated.
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
 *                 msg: Admin updated
 *                 objectId: 1234567890
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', validateResource(PatchAdminRequestSchema), updateAdmin)
router.patch('/:id', validateResource(PatchAdminRequestSchema), updateAdmin)

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Delete a admin by ID
 *     tags: [admins]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the admin to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Admin deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: Admin Deleted
 *       500:
 *         description: Internal server error.
 */
router.delete('/:id', validateResource(DeleteAdminRequestSchema), deleteAdmin)

export = router

// Define the Admin schema here if not already defined in the models.
// Replace `type: object` with the actual Admin schema.
// This schema will be referenced in the Swagger JSDoc comments.

/**
 * @swagger
 * components:
 *   schemas:
 *     Admin:
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
