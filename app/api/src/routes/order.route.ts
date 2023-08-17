import express from 'express'
const router = express.Router()

import { validateResource } from '../middleware/validate.middleware'
import { isAuth, isAdmin } from '../middleware/auth.middleware'
import { isMyOrder } from '../middleware/order.middleware'

import {
  getAllOrders,
  getMyOrders,
  getOrdersByUserId,
  getSingleOrder,
  deleteOrder,
  updateOrderPrice,
} from '../controller/order.controller'

import {
  GetOrderRequestSchema,
  GetMyOrdersRequestSchema,
  GetOrdersRequestSchema,
  GetOrdersByUserIdRequestSchema,
  PatchOrderPriceRequestSchema,
  DeleteOrderRequestSchema,
} from '../schema/order.schema'

/**
 * @swagger
 * tags:
 *   name: orders
 *   description: API for managing orders and the items.
 */

/**
 * @swagger
 * /orders:
 *   get:
 *     summary: Get all orders.
 *     tags: [orders]
 *     security:
 *        - token: []
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
 *     responses:
 *       200:
 *         description: Successful response with an array of food items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  isAuth,
  isAdmin,
  validateResource(GetOrdersRequestSchema),
  getAllOrders,
)

/**
 * @swagger
 * /orders/my:
 *   get:
 *     summary: Get my orders.
 *     tags: [orders]
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
 *         description: Successful response with the orders of request caller.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/my',
  isAuth,
  validateResource(GetMyOrdersRequestSchema),
  getMyOrders,
)

/**
 * @swagger
 * /orders/my/{id}:
 *   get:
 *     summary: Get a single order by ID of current user.
 *     tags: [orders]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order item to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/my/:id',
  isAuth,
  isMyOrder,
  validateResource(GetOrderRequestSchema),
  getSingleOrder,
)

/**
 * @swagger
 * /orders/{id}:
 *   get:
 *     summary: Get a single order by ID.
 *     tags: [orders]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order item to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(GetOrderRequestSchema),
  getSingleOrder,
)

/**
 * @swagger
 * /orders/user/{userId}:
 *   get:
 *     summary: Get orders by user ID.
 *     tags: [orders]
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
 *     responses:
 *       200:
 *         description: Successful response with an array of food items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/user/:userId',
  isAuth,
  isAdmin,
  validateResource(GetOrdersByUserIdRequestSchema),
  getOrdersByUserId,
)

/**
 * @swagger
 * /orders/price/{id}:
 *   put:
 *     summary: Update a order's price
 *     tags: [orders]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order to be updated
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     requestBody:
 *       description: Price to be updated
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               totalPrice:
 *                 type: number
 *             example:
 *               totalPrice: 10
 *     responses:
 *       200:
 *         description: Successfully updated the order.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error
 */
router.put(
  '/price/:id',
  isAuth,
  isAdmin,
  validateResource(PatchOrderPriceRequestSchema),
  updateOrderPrice,
)
router.patch(
  '/price/:id',
  isAuth,
  isAdmin,
  validateResource(PatchOrderPriceRequestSchema),
  updateOrderPrice,
)

/**
 * @swagger
 * /orders/{id}:
 *   delete:
 *     summary: Delete a order item
 *     tags: [orders]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the order item to delete
 *         schema:
 *           type: string
 *         example: 64ba3d8a4fa4f1341e5d10af
 *     responses:
 *       200:
 *         description: Successfully deleted the order item.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetOrdersResponse'
 *       500:
 *         description: Internal server error
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteOrderRequestSchema),
  deleteOrder,
)

export = router
