import { BadRequestError } from 'error-middleware/errors'
import knex from '../config/knex'

interface UserInterface {
  id: any
  name: string
  email: string
  password: string
}

export class UserModel {
  static async create(data): Promise<UserInterface> {
    const userId = await knex('user').insert(data, 'user_id')

    return {
      id: userId,
      ...data,
    }
  }

  static async delete(userId) {
    const deleted = await knex('user')
      .where('user_id', userId)
      .del()

    return deleted
  }

  static async getByEmail(email) {
    const user = await knex('user')
      .select({ userId: 'user.user_id', password: 'user.password' })
      .where('email', email)
      .first()

    return user
  }

  static async emailAvailable(email) {
    const user = await knex('user')
      .select({ userId: 'user.user_id', password: 'user.password' })
      .where('email', email)
      .first()

    if (user) {
      return false
    }
  }

  static async update(userId, data) {
    return await knex('user')
      .where('user_id', userId)
      .update(data)
  }
}
