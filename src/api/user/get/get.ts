import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { verifyToken } from '../../../middleware/authentication.middleware'
import { User } from '../../../services/user.service'

const router = express.Router()

router.get(
  '/',
  verifyToken,
  asyncHandler(async (req: any, res) => {
    const userData = await User.get(req.authData.user.user_id)

    res.send(userData)
  }),
)

export = router
