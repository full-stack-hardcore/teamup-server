import { BadRequestError, UnauthorizedError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'
import * as jwt from 'jsonwebtoken'
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
  name: {
    in: 'body',
    isLength: {
      errorMessage: 'name should be at least 3 chars long and max of 100 chars long',
      options: { min: 3, max: 50 },
    },
  },
}

const editSchema: any = {
  email: {
    isEmail: true,
    in: 'body',
    trim: true,
    errorMessage: 'Invalid email',
    optional: true,
  },
  password: {
    in: 'body',
    isLength: {
      errorMessage: 'Password should be at least 5 chars long and max of 10 chars long',
      options: { min: 5, max: 10 },
    },
    optional: true,
  },
  name: {
    in: 'body',
    isLength: {
      errorMessage: 'name should be at least 3 chars long and max of 100 chars long',
      options: { min: 3, max: 50 },
    },
    optional: true,
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
  validationMiddleware(editSchema),
  verifyToken,
  asyncHandler(async (req: any, res) => {
    const user = req.authData.user.user
    const data = req.body
    const updatedUser = await UserModel.update(user.user_id, data)
    if (updatedUser) {
      res.send('User updated successfully')
    } else {
      throw new BadRequestError()
    }
  }),
)
function verifyToken(req, res, next) {
  const authToken = req.headers.authorization
  jwt.verify(authToken, 'secretKeyHere', (err, authData) => {
    if (err) {
      throw new UnauthorizedError()
    }
    req.authData = authData
    next()
  })
}

export = router
