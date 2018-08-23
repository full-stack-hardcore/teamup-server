import * as express from 'express'
import * as loginRouter from './login'

const router = express.Router()

router.use('/', loginRouter)

export = router
