const path = require('path')
const multer = require('multer')

const MAX_FILE_SIZE = 1024 // 1mb
const EXT_CHECK = ['.webp', '.jpg', '.png', '.jpeg', '.bmp', '.gif']

module.exports = {
  upload: multer({
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
  }),
}
