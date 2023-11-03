import express from 'express'

import { validateResource } from '../middleware/validate.middleware'
import { isAuth, isAdmin } from '../middleware/auth.middleware'

import {
  getTreningItems,
  getBestSeller,
} from '../controller/trending.controller'

import { GetTrendinItemsRequestSchema } from '../schema/trending.schema'
const router = express.Router()

/**
 * @swagger
 * tags:
 *   name: trending
 *   description: API for trending items.
 */

/**
 * @swagger
 * /trending:
 *   get:
 *     summary: Get all trending items.
 *     tags: [trending]
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
 *         description: Successful response with an array of trendin items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTrendingItemsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/',
  isAuth,
  isAdmin,
  validateResource(GetTrendinItemsRequestSchema),
  getTreningItems,
)

/**
 * @swagger
 * /trending/bestseller:
 *   get:
 *     summary: Get bestseller item.
 *     tags: [trending]
 *     security:
 *        - token: []
 *     responses:
 *       200:
 *         description: Successful response with an array of trendin items.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GetTrendingItemsResponse'
 *       500:
 *         description: Internal server error.
 */
router.get('/bestseller', isAuth, isAdmin, getBestSeller)
export = router
