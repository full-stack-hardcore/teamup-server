import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { User } from '../../../services/user.service'
import { userCreateSchema } from './create.schema'

const router = express.Router()

router.post(
  '/',
  validationMiddleware(userCreateSchema),
  asyncHandler(async (req, res) => {
    await User.create(req.body)

    res.sendStatus(201)
  }),
)

export = router
