import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { verifyToken } from '../../../middleware/authentication.middleware'
import { User } from '../../../services/user.service'
import { userEditSchema } from './update.schema'

const router = express.Router()

router.patch(
  '/',
  validationMiddleware(userEditSchema),
  verifyToken,
  asyncHandler(async (req: any, res) => {
    await User.update(req.authData.user.user_id, req.body)

    res.sendStatus(200)
  }),
)

export = router
