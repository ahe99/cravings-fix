const express = require('express')
const router = express.Router()
const banners = require('../controller/banners')

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

router.get('/', banners.getAllBanners)
router.get('/:id', banners.getSingleBanner)

router.post('/', upload.single('image'), banners.addBanner)

router.put('/:id', upload.single('image'), banners.updateBanner)
router.patch('/:id', upload.single('image'), banners.updateBanner)

router.delete('/:id', banners.deleteBanner)

module.exports = router
