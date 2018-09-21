import { UnauthorizedError } from 'error-middleware/errors'
import * as jwt from 'jsonwebtoken'

import { keys } from '../config/config'

export function verifyToken(req, res, next) {
  const authToken = req.headers.authorization
  jwt.verify(authToken, keys.secret, (err, authData) => {
    if (err) {
      throw new UnauthorizedError()
    }
    req.authData = authData
    next()
  })
}
