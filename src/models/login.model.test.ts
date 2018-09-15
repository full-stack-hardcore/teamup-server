import { LoginModel } from './login.model'

describe('Login Model Tests', () => {
  test('Tests login authentication', () => {
    const user = {
      email: 'lucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(1)

    return LoginModel.verify(user).then((data) => {
      expect(data.name).toEqual('lucas')
    })
  })
})
