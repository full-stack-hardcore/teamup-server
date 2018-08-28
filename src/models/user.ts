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

    const userIds = await knex('user').insert(user, 'user_id')
    const userIdType = typeof userIds
    const userId = userIdType === 'number' || userIdType === 'string' ? userIds : userIds[0]

    return {
      id: userId,
      ...user,
    }
  }
}
