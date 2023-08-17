import express from 'express'
const router = express.Router()

import { validateResource } from '../middleware/validate.middleware'
import { hasCart } from '../middleware/cart.middleware'
import { isAdmin, isAuth } from '../middleware/auth.middleware'

import {
  getAllCarts,
  getMyCart,
  getCartByUserId,
  getSingleCart,
  addCartItem,
  deleteCartItem,
  updateCartItem,
  checkoutMyCart,
} from '../controller/cart.controller'

import {
  GetCartRequestSchema,
  GetCartsRequestSchema,
  GetCartByUserIdRequestSchema,
  PostCartCreateItemRequestSchema,
  UpdateCartItemRequestSchema,
  DeleteCartItemRequestSchema,
} from '../schema/cart.schema'

/**
 * @swagger
 * tags:
 *   name: carts
 *   description: API for managing carts and the items.
 */

/**
 * @swagger
 * /carts:
 *   get:
 *     summary: Get all carts.
 *     tags: [carts]
 *     security:
 *        - token: []
 *     parameters:
 *        - in: query
 *          name: limit
 *          schema:
 *            type: integer
 *          description: The maximum number of items to return.
 *        - in: query
 *          name: offset
 *          schema:
 *            type: integer
 *          description: The offset for pagination.
 *     responses:
 *       200:
 *         description: Successful response with an array of food items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  isAuth,
  isAdmin,
  validateResource(GetCartsRequestSchema),
  getAllCarts,
)

/**
 * @swagger
 * /carts/my:
 *   get:
 *     summary: Get my cart.
 *     tags: [carts]
 *     security:
 *        - token: []
 *     responses:
 *       200:
 *         description: Successful response with the cart of request caller.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get('/my', isAuth, hasCart, getMyCart)

/**
 * @swagger
 * /carts/{id}:
 *   get:
 *     summary: Get a single cart by ID.
 *     tags: [carts]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the cart item to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the cart item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(GetCartRequestSchema),
  getSingleCart,
)

/**
 * @swagger
 * /carts/user/{userId}:
 *   get:
 *     summary: Get a single cart by user ID.
 *     tags: [carts]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the food item to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successful response with an array of food items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/user/:userId',
  isAuth,
  isAdmin,
  validateResource(GetCartByUserIdRequestSchema),
  getCartByUserId,
)

/**
 * @swagger
 * /carts/my/checkout:
 *   post:
 *     summary: Checkout my cart and create order.
 *     tags: [carts]
 *     security:
 *        - token: []
 *     responses:
 *       200:
 *         description: Successful response with the order of request caller.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetCartsResponse'
 *       500:
 *         description: Internal server error.
 */
router.post('/my/checkout', isAuth, hasCart, checkoutMyCart)

/**
 * @swagger
 * /carts/my/{foodId}:
 *   post:
 *     summary: Add a food item to the cart
 *     tags: [carts]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: foodId
 *         required: true
 *         description: ID of the food to add
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: Cart item details to be added
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             example:
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Successfully added the food item to the cart.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cart'
 *       401:
 *         description: Unauthorized - User ID not provided in headers.
 *       500:
 *         description: Internal server error.
 */
router.post(
  '/my/:foodId',
  isAuth,
  hasCart,
  validateResource(PostCartCreateItemRequestSchema),
  addCartItem,
)

/**
 * @swagger
 * /carts/my/{cartItemId}:
 *   put:
 *     summary: Update a cart item by ID
 *     tags: [carts]
 *     security:
 *       - token: []
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: Cart item details to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: integer
 *             example:
 *               quantity: 2
 *     responses:
 *       200:
 *         description: Cart item deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *               example:
 *                 msg: Cart Updated
 *                 data:
 *                   _id: 1234567890
 *                   userId: 9876543210
 *                   foodId: 4567890123
 *                   quantity: 2
 *       401:
 *         description: Unauthorized - User ID not provided in headers.
 *       500:
 *         description: Internal server error.
 */
router.put(
  '/my/:cartItemId',
  isAuth,
  hasCart,
  validateResource(UpdateCartItemRequestSchema),
  updateCartItem,
)

/**
 * @swagger
 * /carts/my/{cartItemId}:
 *   delete:
 *     summary: Delete a cart item by ID
 *     tags: [carts]
 *     parameters:
 *       - in: path
 *         name: cartItemId
 *         required: true
 *         description: ID of the cart item to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     security:
 *       - token: []
 *     responses:
 *       200:
 *         description: Cart item deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/CartItem'
 *               example:
 *                 msg: Cart Deleted
 *                 data:
 *                   _id: 1234567890
 *                   userId: 9876543210
 *                   foodId: 4567890123
 *                   quantity: 2
 *       401:
 *         description: Unauthorized - User ID not provided in headers.
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/my/:cartItemId',
  isAuth,
  hasCart,
  validateResource(DeleteCartItemRequestSchema),
  deleteCartItem,
)

export = router
