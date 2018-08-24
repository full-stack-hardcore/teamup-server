import * as express from 'express'
import * as userRouter from './user'

const router = express.Router()

router.use('/', userRouter)

export = router
