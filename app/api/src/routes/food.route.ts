import express from 'express'
const router = express.Router()
import { getAllFoods, getSingleFood, addFood, updateFood, deleteFood } from '../controller/food.controller'
import { validateResource } from '../middleware/validate.middleware'

import {
  GetFoodsRequestSchema,
  GetFoodRequestSchema,
  PostFoodCreateSchema,
  PatchFoodRequestSchema,
  DeleteFoodRequestSchema,
} from '../schema/food.schema'
// const { upload } = require('../middleware/file')

/**
 * @swagger
 * tags:
 *   name: foods
 *   description: API for managing food items.
 */

/**
 * @swagger
 * /foods:
 *   get:
 *     summary: Get all foods.
 *     tags: [foods]
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
 *         description: The optional name parameter to filter foods by name.
 *     responses:
 *       200:
 *         description: Successful response with an array of food items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetFoodsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateResource(GetFoodsRequestSchema), getAllFoods)

/**
 * @swagger
 * /foods/{id}:
 *   get:
 *     summary: Get a single food item by ID
 *     tags: [foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully retrieved the food item.
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
 *                 stockQuantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *               example:
 *                 _id: "1234567890"
 *                 name: Sample Food
 *                 description: This is a sample food item.
 *                 stockQuantity: 10
 *                 price: 9.99
 *                 categoryId: "1234567890"
 *       404:
 *         description: Food item with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get('/:id', validateResource(GetFoodRequestSchema), getSingleFood)

/**
 * @swagger
 * /foods:
 *   post:
 *     summary: Add a new food item
 *     tags: [foods]
 *     requestBody:
 *       description: Food object to be added
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
 *               stockQuantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               categoryId:
 *                   type: string
 *             example:
 *               name: Sample Food
 *               description: This is a sample food item.
 *               stockQuantity: 10
 *               price: 9.99
 *               categoryId: "1234567890"
 *     responses:
 *       200:
 *         description: Successfully added the food item.
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
 *                 stockQuantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *               example:
 *                 _id: "1234567890"
 *                 name: Sample Food
 *                 description: This is a sample food item.
 *                 stockQuantity: 10
 *                 price: 9.99
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.post('/', validateResource(PostFoodCreateSchema), addFood)
// router.post('/image/:id', upload.single('image'), food.updateImage)


/**
 * @swagger
 * /foods/{id}:
 *   put:
 *     summary: Update a food item
 *     tags: [foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to retrieve
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     requestBody:
 *       description: Food object to be updated
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
 *               stockQuantity:
 *                 type: integer
 *               price:
 *                 type: number
 *               categoryId:
 *                   type: string
 *             example:
 *               name: Sample Food
 *               description: This is a sample food item.
 *               stockQuantity: 10
 *               price: 9.99
 *               categoryId: "1234567890"
 *     responses:
 *       200:
 *         description: Successfully updated the food item.
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
 *                 stockQuantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *               example:
 *                 _id: "1234567890"
 *                 name: Sample Food
 *                 description: This is a sample food item.
 *                 stockQuantity: 10
 *                 price: 9.99
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.put('/:id', validateResource(PatchFoodRequestSchema), updateFood)
router.patch('/:id', validateResource(PatchFoodRequestSchema), updateFood)


/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags: [foods]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to delete
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully deleted the food item.
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
 *                 stockQuantity:
 *                   type: integer
 *                 price:
 *                   type: number
 *                 categoryId:
 *                   type: string
 *               example:
 *                 _id: "1234567890"
 *                 name: Sample Food
 *                 description: This is a sample food item.
 *                 stockQuantity: 10
 *                 price: 9.99
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  validateResource(DeleteFoodRequestSchema),
  deleteFood,
)

export = router
