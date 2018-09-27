import { UserModel } from './user.model'

describe('User Model Tests', () => {
  test('Tests user Model Create', () => {
    const user = {
      user_id: 999998,
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(1)

    return UserModel.create(user).then((data) => {
      expect(data).toEqual({
        id: [999998],
        user_id: 999998,
        name: 'lucas',
        email: 'lucas@gmail.com',
        password: 'safepass',
      })
    })
  })

  test('Tests user Model Update', () => {
    const user = {
      name: 'lucas Updated',
      email: 'TestlucasUpdatedByModel@gmail.com',
      password: 'safepass',
    }
    const userId = 76
    expect.assertions(1)

    return UserModel.update(userId, user).then((data) => {
      expect(data).toEqual(1)
    })
  })

  test('Tests user Model Delete', () => {
    const userId = 999998
    expect.assertions(1)

    return UserModel.delete(userId).then((data) => {
      expect(data).toEqual(1)
    })
  })

  test('Tests user Model GetByEmail', () => {
    const email = 'lucas@gmail.com'

    expect.assertions(1)

    return UserModel.getByEmail(email).then((data) => {
      expect(data).toEqual({
        userId: 1,
        password: 'safepass',
      })
    })
  })

  test('Tests user Model GetByEmail', () => {
    const email = 'lucas@gmail.com'

    expect.assertions(1)

    return UserModel.getByEmail(email).then((data) => {
      expect(data).toEqual({
        userId: 1,
        password: 'safepass',
      })
    })
  })

  test('Tests user Model emailAvailable to be true', () => {
    const email = 'ThisEmail@DoesNotExists.com'

    expect.assertions(1)

    return UserModel.emailAvailable(email).then((data) => {
      expect(data).toBeUndefined()
    })
  })

  test('Tests user Model emailAvailable to be False', () => {
    const email = 'lucas@gmail.com'

    expect.assertions(1)

    return UserModel.emailAvailable(email).then((data) => {
      expect(data).toBe(false)
    })
  })
})
