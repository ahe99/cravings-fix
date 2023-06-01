const express = require('express')
const router = express.Router()
const food = require('../controller/food')

router.get('/', food.readFoods)

module.exports = router
