const express = require('express')
const router = express.Router()
const cart = require('../controller/cart')
const { validateResource } = require('../middleware/validate')
const { isAuth } = require('../middleware/auth')
const {
  GetCartRequestSchema,
  GetCartsRequestSchema,
  PostCartCreateSchema,
  DeleteMyCartItemRequestSchema,
} = require('../schema/cart')

router.get('/', validateResource(GetCartsRequestSchema), cart.getAllCarts)
router.get('/my', isAuth, cart.getMyCart)
router.get('/:id', validateResource(GetCartRequestSchema), cart.getSingleCart)

router.post(
  '/',
  isAuth,
  validateResource(PostCartCreateSchema),
  cart.addCartItem,
)

// router.delete(
//   '/my/:foodId',
//   validateResource(DeleteMyCartItemRequestSchema),
//   cart.deleteCart,
// )

module.exports = router
