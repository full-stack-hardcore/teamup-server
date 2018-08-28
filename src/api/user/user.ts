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
    custom: {
      options: asyncHandler(async (value) => {
        const user = await UserModel.getByEmail(value)
        if (user) {
          throw new BadRequestError('Email already exists')
        }

        return
      }),
    },
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
  '/',
  validationMiddleware(schema),
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

export = router
