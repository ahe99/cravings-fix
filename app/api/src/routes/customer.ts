import express from 'express'
const router = express.Router()

import { validateResource } from '../middleware/validate'
import {
  GetCustomersRequestSchema,
  GetCustomerRequestSchema,
  PostCustomerCreateSchema,
  PostCustomerLoginSchema,
  PatchCustomerRequestSchema,
  DeleteCustomerRequestSchema,
} from '../schema/customer'
import {
  getAllCustomers,
  getSingleCustomer,
  register,
  login,
  updateCustomer,
  deleteCustomer,
} from '../controller/customer'

/**
 * @swagger
 * tags:
 *   name: customers
 *   description: API for managing customers.
 */

/**
 * @swagger
 * /customers:
 *   get:
 *     summary: Get all customers
 *     tags: [customers]
 *     parameters:
 *       - in: query
 *         name: name
 *         description: Filter customers by name
 *         schema:
 *           type: string
 *       - in: query
 *         name: limit
 *         description: Maximum number of customers to return
 *         schema:
 *           type: integer
 *       - in: query
 *         name: offset
 *         description: Number of customers to skip from the beginning
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Successfully fetched customers.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Customer'
 *       500:
 *         description: Internal server error.
 */
router.get('/', validateResource(GetCustomersRequestSchema), getAllCustomers)

// router.get('/me', getCurrentUser)

/**
 * @swagger
 * /customers/{id}:
 *   get:
 *     summary: Get a single customer by ID
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to retrieve
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Successfully retrieved the customer.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Customer'
 *       404:
 *         description: Customer with the provided ID not found.
 *       500:
 *         description: Internal server error.
 */
router.get(
  '/:id',
  validateResource(GetCustomerRequestSchema),
  getSingleCustomer,
)

/**
 * @swagger
 * /customers/register:
 *   post:
 *     summary: Register a new customer
 *     tags: [customers]
 *     requestBody:
 *       description: Customer object to be registered
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
 *         description: Successfully registered the customer.
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
router.post('/register', validateResource(PostCustomerCreateSchema), register)

/**
 * @swagger
 * /customers/login:
 *   post:
 *     summary: Log in as a customer
 *     tags: [customers]
 *     requestBody:
 *       description: Customer credentials for login
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
 *               $ref: '#/components/schemas/Customer'
 *       401:
 *         description: Authentication failed.
 *       500:
 *         description: Internal server error.
 */
router.post('/login', validateResource(PostCustomerLoginSchema), login)

/**
 * @swagger
 * /customers/{id}:
 *   put:
 *     summary: Update a customer by ID
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to update
 *         schema:
 *           type: string
 *         example: 1234567890
 *     requestBody:
 *       description: Customer object with updated fields
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
 *         description: Customer updated.
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
 *                 msg: Customer updated
 *                 objectId: 1234567890
 *       500:
 *         description: Internal server error.
 */
router.put('/:id', validateResource(PatchCustomerRequestSchema), updateCustomer)
router.patch(
  '/:id',
  validateResource(PatchCustomerRequestSchema),
  updateCustomer,
)

/**
 * @swagger
 * /customers/{id}:
 *   delete:
 *     summary: Delete a customer by ID
 *     tags: [customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the customer to delete
 *         schema:
 *           type: string
 *         example: 1234567890
 *     responses:
 *       200:
 *         description: Customer deleted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *               example:
 *                 msg: Customer Deleted
 *       500:
 *         description: Internal server error.
 */
router.delete(
  '/:id',
  validateResource(DeleteCustomerRequestSchema),
  deleteCustomer,
)

export = router

// Define the Customer schema here if not already defined in the models.
// Replace `type: object` with the actual Customer schema.
// This schema will be referenced in the Swagger JSDoc comments.

/**
 * @swagger
 * components:
 *   schemas:
 *     Customer:
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
