import express from 'express'
const router = express.Router()
import {
  getAllCategories,
  getSingleCategory,
  addCategory,
  updateCategory,
  deleteCategory,
} from '../controller/category.controller'
import { validateResource } from '../middleware/validate.middleware'
import { isAdmin, isAuth } from '../middleware/auth.middleware'

import {
  GetCategoriesRequestSchema,
  GetCategoryRequestSchema,
  PostCategoryCreateSchema,
  PatchCategoryRequestSchema,
  DeleteCategoryRequestSchema,
} from '../schema/category.schema'

/**
 * @swagger
 * tags:
 *   name: categories
 *   description: API for managing category items.
 */

/**
 * @swagger
 * /categories:
 *   get:
 *     summary: Get all categories.
 *     tags: [categories]
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
 *         description: The optional name parameter to filter categories by name.
 *     responses:
 *       200:
 *         description: Successful response with an array of category items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCategoriesResponse'
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateResource(GetCategoriesRequestSchema), getAllCategories)

/**
 * @swagger
 * /categories/{id}:
 *   get:
 *     summary: Get a single category item by ID
 *     tags: [categories]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully retrieved the category item.
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
 *                 name: Sample Category
 *                 description: This is a sample category item.
 *       404:
 *         description: Category item with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(GetCategoryRequestSchema),
  getSingleCategory,
)

/**
 * @swagger
 * /categories:
 *   post:
 *     summary: Add a new category item
 *     tags: [categories]
 *     security:
 *        - token: []
 *     requestBody:
 *       description: Category object to be added
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
 *               name: Sample Category
 *               description: This is a sample category item.
 *     responses:
 *       200:
 *         description: Successfully added the category item.
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
 *                 name: Sample Category
 *                 description: This is a sample category item.
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  isAuth,
  isAdmin,
  validateResource(PostCategoryCreateSchema),
  addCategory,
)

/**
 * @swagger
 * /categories/{id}:
 *   put:
 *     summary: Update a category item
 *     tags: [categories]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     requestBody:
 *       description: Category object to be updated
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
 *               name: Sample Category
 *               description: This is a sample category item.
 *     responses:
 *       200:
 *         description: Successfully updated the category item.
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
 *                 name: Sample Category
 *                 description: This is a sample category item.
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchCategoryRequestSchema),
  updateCategory,
)
router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchCategoryRequestSchema),
  updateCategory,
)

/**
 * @swagger
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category item
 *     tags: [categories]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the category item to delete
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully deleted the category item.
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
 *                 name: Sample Category
 *                 description: This is a sample category item.
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteCategoryRequestSchema),
  deleteCategory,
)

export = router
