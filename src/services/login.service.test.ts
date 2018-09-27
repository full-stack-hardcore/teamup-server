import { Login } from './login.service'

describe('Login Tests', () => {
  test('Tests token generation', () => {
    const user = {
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: 'safepass',
    }
    expect(typeof Login.generateToken(user)).toBe('string')
  })

  test('Tests Login', () => {
    const user = {
      name: 'lucas',
      email: 'lucas@gmail.com',
      password: 'safepass',
    }
    expect(typeof Login.login(user)).toBe('object')
  })
})
