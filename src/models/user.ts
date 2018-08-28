import knex from '../../knex'

interface UserInterface {
  id: any
  name: string
  email: string
  password: string
}

export class UserModel {
  static async create(data): Promise<UserInterface> {
    const userIds = await knex('user').insert(data, 'user_id')
    const userIdType = typeof userIds
    const userId = userIdType === 'number' || userIdType === 'string' ? userIds : userIds[0]

    return {
      id: userId,
      ...data,
    }
  }

  static async getByEmail(email) {
    const user = await knex('user')
      .select({ userId: 'user.user_id', password: 'user.password' })
      .where('email', email)
      .first()

    return user
  }
}
