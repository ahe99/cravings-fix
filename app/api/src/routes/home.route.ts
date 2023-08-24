import express from 'express'

import { indexPage } from '../controller/home.controller'

const router = express.Router()

router.get('/', indexPage)

export = router
