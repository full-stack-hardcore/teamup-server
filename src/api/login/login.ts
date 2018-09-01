import { BadRequestError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { keys } from '../../config/config'
import { Login } from '../../services/login.service'
import { loginSchema } from './login.schema'

const router = express.Router()

router.post(
  '/',
  validationMiddleware(loginSchema),
  asyncHandler(async (req, res) => {
    const token = await Login.login(req.body)
    if (!token) {
      throw new BadRequestError('Your credentials are invalid')
    }
    res.json({
      token,
    })
  }),
)

export = router
