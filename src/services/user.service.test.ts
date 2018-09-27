import { User } from './user.service'

describe('User Services Tests', () => {
  test('Tests user Creation', () => {
    const user = {
      user_id: 999999,
      name: 'lucas',
      email: 'Testlucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(1)

    return User.create(user).then((data) => {
      expect(data).toBeUndefined()
    })
  })
  test('Tests user Update', () => {
    const user = {
      name: 'lucas Updated',
      email: 'TestlucasUpdated@gmail.com',
      password: 'safepass',
    }
    const userId = 76
    expect.assertions(1)

    return User.update(userId, user).then((data) => {
      expect(data).toBeUndefined()
    })
  })
  test('Tests user Delete', () => {
    const userId = 999999
    expect.assertions(1)

    return User.delete(userId).then((data) => {
      expect(data).toBeUndefined()
    })
  })
})
