import { BadRequestError } from 'error-middleware/errors'

import { UserModel } from '../models/user.model'

export class User {
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
    const deleted = await UserModel.delete(userId)
    if (deleted === 0) {
      throw new BadRequestError('Invalid user ID')
    }
  }
}
