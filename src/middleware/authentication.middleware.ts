import { UnauthorizedError } from 'error-middleware/errors'
import * as jwt from 'jsonwebtoken'

export function verifyToken(req, res, next) {
  const authToken = req.headers.authorization
  jwt.verify(authToken, process.env.SECRET_KEY, (err, authData) => {
    if (err) {
      throw new UnauthorizedError()
    }
    req.authData = authData
    next()
  })
}
