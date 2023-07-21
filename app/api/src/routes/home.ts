const express = require('express')
const router = express.Router()

import { indexPage } from '../controller/home'

router.get('/', indexPage)

export = router
