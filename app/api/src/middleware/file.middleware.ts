import path from 'path'
import multer from 'multer'

import { FileValidationError } from '../utils/errorException'

const MAX_FILE_SIZE = 500 * 1024 // 1mb
const EXT_CHECK = ['.webp']

export const upload = multer({
  limits: {
    fileSize: MAX_FILE_SIZE,
  },
  fileFilter: function (req, file, callback) {
    const ext = path.extname(file.originalname)

    if (EXT_CHECK.indexOf(ext) === -1) {
      return callback(new FileValidationError('FILE_NOT_ALLOWED'))
    }
    callback(null, true)
  },
})
