const express = require('express')
const router = express.Router()
const food = require('../controller/food')
const { validateResource } = require('../middleware/validate')
const {
  GetFoodRequestSchema,
  GetFoodsRequestSchema,
  PostProductCreateSchema,
  PatchProductRequestSchema,
  DeleteProductRequestSchema,
} = require('../schema/food')

router.get('/', validateResource(GetFoodsRequestSchema), food.getAllFoods)
router.get('/:id', validateResource(GetFoodRequestSchema), food.getSingleFood)

router.post('/', validateResource(PostProductCreateSchema), food.addFood)

router.put('/:id', validateResource(PatchProductRequestSchema), food.updateFood)
router.patch(
  '/:id',
  validateResource(PatchProductRequestSchema),
  food.updateFood
)

router.delete(
  '/:id',
  validateResource(DeleteProductRequestSchema),
  food.deleteFood
)

module.exports = router
