import { BadRequestError, UnauthorizedError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'
import * as jwt from 'jsonwebtoken'
import { LoginModel } from '../../models/login'

const router = express.Router()

const { checkSchema, validationResult } = require('express-validator/check')

router.get('/', verifyToken, (req, res) => {
  res.send('Hello from login')
})

router.get('/secure', verifyToken, (req: any, res) => {
  res.json({
    message: 'Secure Route',
    authData: req.authData,
  })
})

router.post('/secure', verifyToken, (req: any, res) => {
  res.json({
    message: 'Secure Route',
    authData: req.authData,
  })
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
  '/',
  validationMiddleware(schema),
  asyncHandler(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    }
    const user = await LoginModel.verify(data)
    if (user) {
      jwt.sign({ user: { user } }, 'secretKeyHere', { expiresIn: '30s' }, (err, token) => {
        res.json({
          token: { token },
        })
      })
    } else {
      throw new BadRequestError({
        error: 'Your credentials are invalid',
      })
    }
  }),
)

function verifyToken(req, res, next) {
  const authToken = req.headers['authorization']
  jwt.verify(authToken, 'secretKeyHere', (err, authData) => {
    if (err) {
      throw new UnauthorizedError()
    }
    req.authData = authData
    next()
  })
}

export = router
