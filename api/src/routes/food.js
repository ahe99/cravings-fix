const express = require('express')
const router = express.Router()
const food = require('../controller/food')
const { validateResource } = require('../middleware/validate')
const {
  GetFoodRequestSchema,
  GetFoodsRequestSchema,
  PostFoodCreateSchema,
  PatchFoodRequestSchema,
  DeleteFoodRequestSchema,
} = require('../schema/food')
const { upload } = require('../middleware/file')

router.get('/', validateResource(GetFoodsRequestSchema), food.getAllFoods)
router.get('/:id', validateResource(GetFoodRequestSchema), food.getSingleFood)

router.post('/', validateResource(PostFoodCreateSchema), food.addFood)
router.post('/image/:id', upload.single('image'), food.updateImage)

router.put('/:id', validateResource(PatchFoodRequestSchema), food.updateFood)
router.patch('/:id', validateResource(PatchFoodRequestSchema), food.updateFood)

router.delete(
  '/:id',
  validateResource(DeleteFoodRequestSchema),
  food.deleteFood,
)

module.exports = router
