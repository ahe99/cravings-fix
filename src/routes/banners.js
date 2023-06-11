const express = require('express')
const router = express.Router()
const banners = require('../controller/banners')
const { upload } = require('../middleware/file')

router.get('/', banners.getAllBanners)
router.get('/:id', banners.getSingleBanner)

router.post('/', upload.single('image'), banners.addBanner)

router.put('/:id', upload.single('image'), banners.updateBanner)
router.patch('/:id', upload.single('image'), banners.updateBanner)

router.delete('/:id', banners.deleteBanner)

module.exports = router
