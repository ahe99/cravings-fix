const express = require('express')
const router = express.Router()

import { indexPage } from '../controller/home.controller'

router.get('/', indexPage)

export = router
