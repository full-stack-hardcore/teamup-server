import { BadRequestError, UnauthorizedError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'
import * as jwt from 'jsonwebtoken'

import { userSchema, userEditSchema } from '../../lib/userSchema'
import { verifyToken } from '../../middleware/authentication'
import { UserModel } from '../../models/user'

const { checkSchema, validationResult } = require('express-validator/check')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from user API')
})

router.post(
  '/create',
  validationMiddleware(userSchema),
  asyncHandler(async (req, res) => {
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    const user = await UserModel.create(data)
    if (user) {
      res.json({
        id: user.id,
        name: user.name,
        email: user.email,
      })
    } else {
      throw new BadRequestError()
    }
  }),
)

router.post(
  '/edit',
  validationMiddleware(userEditSchema),
  asyncHandler(async (req, res) => {
    const user = await UserModel.getByEmail(req.body.email)
    const data = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }
    if (!user) {
      throw new BadRequestError({
        error: 'User not found.',
      })
    }
    if (req.body.password !== user.password) {
      throw new BadRequestError({
        error: 'Your credentials are invalid',
      })
    }
    const updatedUser = await UserModel.update(user.userId, data)
    if (user) {
      res.send('User updated successfully')
    } else {
      throw new BadRequestError()
    }
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
