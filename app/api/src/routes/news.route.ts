import express from 'express'
const router = express.Router()
import {
  getAllNews,
  getSingleNews,
  addNews,
  updateNews,
  deleteNews,
} from '../controller/news.controller'
import { validateResource } from '../middleware/validate.middleware'
import { isAdmin, isAuth } from '../middleware/auth.middleware'

import {
  GetNewsRequestSchema,
  GetSingleNewsRequestSchema,
  PostNewsCreateSchema,
  PatchNewsRequestSchema,
  DeleteNewsRequestSchema,
} from '../schema/news.schema'

/**
 * @swagger
 * tags:
 *   name: news
 *   description: API for managing news items.
 */

/**
 * @swagger
 * /news:
 *   get:
 *     summary: Get all news.
 *     tags: [news]
 *     parameters:
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The maximum number of items to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: The offset for pagination.
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: The optional name parameter to filter news by name.
 *     responses:
 *       200:
 *         description: Successful response with an array of news items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetNewsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateResource(GetNewsRequestSchema), getAllNews)

/**
 * @swagger
 * /news/{id}:
 *   get:
 *     summary: Get a single news item by ID
 *     tags: [news]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully retrieved the news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 _id: 1234567890
 *                 name: Sample News
 *                 description: This is a sample news item.
 *       404:
 *         description: News item with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  validateResource(GetSingleNewsRequestSchema),
  getSingleNews,
)

/**
 * @swagger
 * /news:
 *   post:
 *     summary: Add a new news item
 *     tags: [news]
 *     security:
 *        - token: []
 *     requestBody:
 *       description: News object to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sample News
 *               description: This is a sample news item.
 *     responses:
 *       200:
 *         description: Successfully added the news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 _id: 1234567890
 *                 name: Sample News
 *                 description: This is a sample news item.
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  isAuth,
  isAdmin,
  validateResource(PostNewsCreateSchema),
  addNews,
)

/**
 * @swagger
 * /news/{id}:
 *   put:
 *     summary: Update a news item
 *     tags: [news]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     requestBody:
 *       description: News object to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *             example:
 *               name: Sample News
 *               description: This is a sample news item.
 *     responses:
 *       200:
 *         description: Successfully updated the news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 _id: 1234567890
 *                 name: Sample News
 *                 description: This is a sample news item.
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchNewsRequestSchema),
  updateNews,
)
router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchNewsRequestSchema),
  updateNews,
)

/**
 * @swagger
 * /news/{id}:
 *   delete:
 *     summary: Delete a news item
 *     tags: [news]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the news item to delete
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully deleted the news item.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *               example:
 *                 _id: 1234567890
 *                 name: Sample News
 *                 description: This is a sample news item.
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteNewsRequestSchema),
  deleteNews,
)

export = router
