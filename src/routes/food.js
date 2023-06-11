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
const path = require('path')
const multer = require('multer')

const MAX_FILE_SIZE = 1024 // 1mb
const EXT_CHECK = ['.webp', '.jpg', '.png', '.jpeg', '.bmp', '.gif']

const upload = multer({
  limit: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)

    if (EXT_CHECK.indexOf(ext) === -1) {
      req.fileValidationError = 'FILE_NOT_ALLOWED'
      return callback()
    }
    callback(null, true)
  },
})

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
