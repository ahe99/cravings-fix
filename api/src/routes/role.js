const express = require('express')
const router = express.Router()
const { validateResource } = require('../middleware/validate')
const { GetRolesRequestSchema } = require('../schema/role')
const role = require('../controller/role')

router.get('/', validateResource(GetRolesRequestSchema), role.getAllRoles)

module.exports = router
