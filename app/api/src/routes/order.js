const express = require('express')
const router = express.Router()
const order = require('../controller/order')
const { validateResource } = require('../middleware/validate')
const { isAuth } = require('../middleware/auth')
const {
  GetOrderRequestSchema,
  GetOrdersRequestSchema,
  PostOrderCreateSchema,
  PatchOrderRequestSchema,
  DeleteOrderRequestSchema,
} = require('../schema/order')

router.get('/', validateResource(GetOrdersRequestSchema), order.getAllOrders)
router.get('/my', isAuth, order.getMyOrders)
router.get(
  '/:id',
  validateResource(GetOrderRequestSchema),
  order.getSingleOrder,
)

router.post(
  '/',
  isAuth,
  validateResource(PostOrderCreateSchema),
  order.addOrder,
)

router.put('/:id', validateResource(PatchOrderRequestSchema), order.updateOrder)
router.patch(
  '/:id',
  validateResource(PatchOrderRequestSchema),
  order.updateOrder,
)

router.delete(
  '/:id',
  validateResource(DeleteOrderRequestSchema),
  order.deleteOrder,
)

module.exports = router
