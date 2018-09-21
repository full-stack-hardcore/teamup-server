import { BadRequestError } from 'error-middleware/errors'
import * as jwt from 'jsonwebtoken'

import { keys } from '../config/config'
import { LoginModel } from '../models/login.model'

export class Login {
  static generateToken(user) {
    return jwt.sign({ user }, keys.secret, { expiresIn: '300s' })
  }

  static async login(data) {
    const user = await LoginModel.verify(data)
    if (!user) {
      throw new BadRequestError('Your credentials are invalid')
    }

    return this.generateToken(user)
  }
}
