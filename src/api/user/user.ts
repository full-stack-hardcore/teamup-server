import { BadRequestError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'
import { UserModel } from '../../models/user'

const { checkSchema, validationResult } = require('express-validator/check')

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello from user API')
})

const schema: any = {
  email: {
    isEmail: true,
    in: 'body',
    trim: true,
    errorMessage: 'Invalid email',
  },
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 5 chars long and max of 10 chars long',
      options: { min: 5, max: 10 },
    },
  },
}

router.post(
  '/create',
  validationMiddleware(schema),
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

router.patch(
  '/',
  validationMiddleware(schema),
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

export = router
