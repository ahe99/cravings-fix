const express = require('express')
const router = express.Router()
const category = require('../controller/category')
const { validateResource } = require('../middleware/validate')
const {
  GetCategoriesRequestSchema,
  GetCategoryRequestSchema,
  PostCategoryCreateSchema,
  PatchCategoryRequestSchema,
  DeleteCategoryRequestSchema,
} = require('../schema/category')

router.get(
  '/',
  validateResource(GetCategoriesRequestSchema),
  category.getAllCategories,
)
router.get(
  '/:id',
  validateResource(GetCategoryRequestSchema),
  category.getSingleCategory,
)

router.post(
  '/',
  validateResource(PostCategoryCreateSchema),
  category.addCategory,
)

router.put(
  '/:id',
  validateResource(PatchCategoryRequestSchema),
  category.updateCategory,
)
router.patch(
  '/:id',
  validateResource(PatchCategoryRequestSchema),
  category.updateCategory,
)

router.delete(
  '/:id',
  validateResource(DeleteCategoryRequestSchema),
  category.deleteCategory,
)

module.exports = router
