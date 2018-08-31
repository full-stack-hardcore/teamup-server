import { BadRequestError } from 'error-middleware/errors'

import * as jwt from 'jsonwebtoken'
import { UserModel } from '../models/user.model'

export class User {
  static generateToken(user) {
    return jwt.sign({ user }, 'secretKeyHere', { expiresIn: '300s' })
  }

  static async create(data) {
    const user = await UserModel.create(data)
    if (!user) {
      throw new BadRequestError()
    }
  }

  static async update(userId, data) {
    const user = await UserModel.update(userId, data)
    if (!user) {
      throw new BadRequestError()
    }
  }

  static async delete(userId) {
    await UserModel.delete(userId)
  }
}
