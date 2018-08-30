import { BadRequestError, UnauthorizedError } from 'error-middleware/errors'
import { validationMiddleware } from 'error-middleware/middlewares'
import * as express from 'express'
import * as asyncHandler from 'express-async-handler'
import * as jwt from 'jsonwebtoken'

import { userSchema } from '../../lib/userSchema'
import { verifyToken } from '../../middleware/authentication'
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

router.post(
  '/',
  validationMiddleware(userSchema),
  asyncHandler(async (req, res) => {
    const data = {
      email: req.body.email,
      password: req.body.password,
    }
    const user = await LoginModel.verify(data)
    if (user) {
      jwt.sign({ user }, 'secretKeyHere', { expiresIn: '30s' }, (err, token) => {
        res.json({
          token,
        })
      })
    } else {
      throw new BadRequestError({
        error: 'Your credentials are invalid',
      })
    }
  }),
)

export = router
