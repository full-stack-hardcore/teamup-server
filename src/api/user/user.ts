import { BadRequestError, UnauthorizedError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'

import { userCreateSchema, userEditSchema } from '../../lib/userSchema'
import { verifyToken } from '../../middleware/authentication'
import { UserModel } from '../../models/user'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from user API')
})

router.post(
  '/',
  validationMiddleware(userCreateSchema),
  asyncHandler(async (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    const user = await UserModel.create(data)
    if (!user) {
      throw new BadRequestError()
    }
    res.sendStatus(201)
  }),
)

router.patch(
  '/',
  validationMiddleware(userEditSchema),
  verifyToken,
  asyncHandler(async (req: any, res) => {
    const user = req.authData.user
    const data = req.body
    const updatedUser = await UserModel.update(user.user_id, data)
    if (!updatedUser) {
      throw new BadRequestError()
    }
    res.sendStatus(200)
  }),
)

router.delete(
  '/',
  verifyToken,
  asyncHandler(async (req: any, res) => {
    const userData = req.authData
    await UserModel.delete(userData.user.user_id)

    res.sendStatus(200)
  }),
)

export = router
