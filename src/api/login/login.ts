import { BadRequestError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { Login } from '../../services/login.service'
import { userSchema } from './login.schema'

const router = express.Router()

router.post(
  '/',
  validationMiddleware(userSchema),
  asyncHandler(async (req, res) => {
    const token = await Login.login(req.body)
    if (!token) {
      throw new BadRequestError({ error: 'Your credentials are invalid' })
    }
    res.json({
      token,
    })
  }),
)

export = router
