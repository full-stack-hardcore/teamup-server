import * as app from '../app'
import { supertest } from '../lib/test_helper'

describe('Test the login route', () => {
  test('Should get the token from the test user', (done) => {
    const user = {
      email: 'lucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(2)

    supertest(app)
      .post('/api/login')
      .send(user)
      .then((response) => {
        const responseData = JSON.parse(response.text)
        expect(response.status).toBe(200)
        expect(typeof responseData.token).toBe('string')
        done()
      })
  })
})
