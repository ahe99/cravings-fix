const express = require('express')
const router = express.Router()
const { validateResource } = require('../middleware/validate')
const { isAuth } = require('../middleware/auth')
const {
  GetUsersRequestSchema,
  GetUserLoginRequestSchema,
  PostUserRequestSchema,
} = require('../schema/user')
const user = require('../controller/user')

router.get('/', validateResource(GetUsersRequestSchema), user.getAllUser)
router.get('/me', isAuth, user.getCurrentUser)

router.post('/', validateResource(PostUserRequestSchema), user.addUser)
router.post(
  '/login',
  validateResource(GetUserLoginRequestSchema),
  user.postLogin,
)

module.exports = router
