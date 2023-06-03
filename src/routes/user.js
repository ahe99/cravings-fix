const express = require('express')
const router = express.Router()
const { validateResource } = require('../middleware/validate')
const { GetUsersRequestSchema } = require('../schema/user')
const user = require('../controller/user')

router.get('/', validateResource(GetUsersRequestSchema), user.getAllUser)

module.exports = router
