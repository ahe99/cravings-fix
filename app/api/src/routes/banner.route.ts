import express from 'express'
const router = express.Router()

import {
  getAllBanners,
  deleteBanner,
  addBanners,
} from '../controller/banner.controller'
import { DeleteBannerRequestSchema } from '../schema/banner.schema'
import { validateResource } from '../middleware/validate.middleware'
import { isAdmin, isAuth } from '../middleware/auth.middleware'
import { upload } from '../middleware/file.middleware'

/**
 * @swagger
 * tags:
 *   name: banners
 *   description: API for managing banner items.
 */

/**
 * @swagger
 * /banners:
 *   get:
 *     summary: Get all banners
 *     tags: [banners]
 *     responses:
 *       200:
 *         description: Successfully fetched all banners with images.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   imageId:
 *                     type: string
 *                   url:
 *                     type: string
 *                 example:
 *                   imageId: 1234567890
 *                   url: http://example.com/banner-image.jpg
 *       500:
 *         description: Internal server error.
 */
router.get('/', getAllBanners)

/**
 * @swagger
 * /banners:
 *   post:
 *     summary: Add new banners
 *     tags: [banners]
 *     security:
 *        - token: []
 *     requestBody:
 *       description: Banner images to be added
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
 *               images: [bannerImage1, bannerImage2]
 *     responses:
 *       200:
 *         description: Banners added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: Banner updated
 *       400:
 *         description: Bad Request - No banner images provided.
 *       500:
 *         description: Internal server error.
 */
router.post('/', isAuth, isAdmin, upload.array('images', 10), addBanners)

/**
 * @swagger
 * /banners/{id}:
 *   delete:
 *     summary: Delete a banner by ID
 *     tags: [banners]
 *     security:
 *        - token: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the banner to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Banner deleted successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                 data:
 *                   $ref: '#/components/schemas/Banner'
 *               example:
 *                 msg: Banner Deleted
 *                 data:
 *                   _id: 1234567890
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  isAuth,
  isAdmin,
  validateResource(DeleteBannerRequestSchema),
  deleteBanner,
)

export = router
