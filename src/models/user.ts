import { BadRequestError } from 'error-middleware/errors'
import knex from '../../knex'

interface UserInterface {
  id: any
  name: string
  email: string
  password: string
}

export class UserModel {
  static async create(data): Promise<UserInterface> {
    const user = {
      name: data.name,
      password: data.password,
      email: data.email,
    }

    const userId = await knex('user').insert(user, 'user_id')

    return {
      id: userId,
      ...user,
    }
  }

  static async getByEmail(email) {
    const user = await knex('user')
      .select({ userId: 'user.user_id', password: 'user.password' })
      .where('email', email)
      .first()

    return user
  }

  static async update(userId, data) {
    const updated = await knex('user')
      .where('user_id', userId)
      .update(data)

    if (!updated) {
      throw new Error()
    }

    return true
  }
}
