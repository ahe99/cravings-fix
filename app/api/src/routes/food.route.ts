import express from 'express'

import { validateResource } from '../middleware/validate.middleware'
import { upload } from '../middleware/file.middleware'
import { isAdmin, isAuth } from '../middleware/auth.middleware'

import {
  getAllFoods,
  getSingleFood,
  addFood,
  updateFood,
  deleteFood,
  updateImage,
  removeImage,
} from '../controller/food.controller'
import {
  GetFoodsRequestSchema,
  GetFoodRequestSchema,
  PostFoodCreateSchema,
  PatchFoodRequestSchema,
  DeleteFoodRequestSchema,
  DeleteFoodImageRequestSchema,
} from '../schema/food.schema'
const router = express.Router()

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
 *                 price: 10
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
 *     security:
 *        - token: []
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
 *                 type: string
 *             example:
 *               name: Sample Food
 *               description: This is a sample food item.
 *               stockQuantity: 10
 *               price: 10
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
 *                 price: 10
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.post(
  '/',
  isAuth,
  isAdmin,
  validateResource(PostFoodCreateSchema),
  addFood,
)

/**
 * @swagger
 * /foods/images/{id}:
 *   post:
 *     summary: Update food images by ID
 *     tags: [foods]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to update images
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: Food images to be updated
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *             example:
 *               images: [imageFile1, imageFile2]
 *     responses:
 *       200:
 *         description: Food images updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 objectId:
 *                   type: string
 *                 images:
 *                   type: array
 *                   items:
 *                     type: string
 *               example:
 *                 msg: Food updated
 *                 objectId: 1234567890
 *                 images: [imageId1, imageId2]
 *       400:
 *         description: Bad Request - No image files provided.
 *       404:
 *         description: Food item with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/images/:id',
  isAuth,
  isAdmin,
  upload.array('images', 10),
  updateImage,
)

/**
 * @swagger
 * /foods/images/{id}/{imageId}:
 *   delete:
 *     summary: Remove a food image by ID from a food item
 *     tags: [foods]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the food item to remove the image from
 *         schema:
 *           type: string
 *         example: 1234567890
 *       - in: path
 *         name: imageId
 *         required: true
 *         description: ID of the image to remove from the food item
 *         schema:
 *           type: string
 *         example: imageId123
 *     responses:
 *       200:
 *         description: Food image removed successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: Food Image Deleted
 *       404:
 *         description: Food item with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/images/:id/:imageId',
  isAuth,
  isAdmin,
  validateResource(DeleteFoodImageRequestSchema),
  removeImage,
)

/**
 * @swagger
 * /foods/{id}:
 *   put:
 *     summary: Update a food item
 *     tags: [foods]
 *     security:
 *        - token: []
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
 *               price: 10
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
 *                 price: 10
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.put(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchFoodRequestSchema),
  updateFood,
)
router.patch(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(PatchFoodRequestSchema),
  updateFood,
)

/**
 * @swagger
 * /foods/{id}:
 *   delete:
 *     summary: Delete a food item
 *     tags: [foods]
 *     security:
 *        - token: []
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
 *                 price: 10
 *                 categoryId: "1234567890"
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteFoodRequestSchema),
  deleteFood,
)

export = router
