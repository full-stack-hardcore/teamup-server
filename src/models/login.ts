import { BadRequestError } from 'error-middleware/errors'
import knex from '../../knex'

export class LoginModel {
  static async verify({ email, password }) {
    const user = await knex
      .from('user')
      .select('user.*')
      .where('user.email', email)
      .first()
    if (!user) {
      throw new BadRequestError({
        error: 'User not found.',
      })
    }
    if (password === user.password) {
      return user
    } else {
      return false
    }
  }
}
