import * as app from '../app'
import { supertest } from '../lib/test_helper'
import { Login } from '../services/login.service'

describe('Test the User routes', () => {
  test('Should create a test user', (done) => {
    const user = {
      user_id: 999999,
      name: 'lucas',
      email: 'Testlucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(1)
    supertest(app)
      .post('/api/user')
      .send(user)
      .then((response) => {
        expect(response.status).toBe(201)
        done()
      })
  })

  test('Should update the test user', async (done) => {
    const user = {
      name: 'lucas Updated e2e',
      email: 'Testlucas@gmail.com',
      password: 'safepass',
    }
    expect.assertions(1)

    const token = await Login.login(user)
    supertest(app)
      .patch('/api/user')
      .set('Authorization', token)
      .send(user)
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
  })

  test('Should delete the test user', async (done) => {
    const user = {
      email: 'Testlucas@gmail.com',
      password: 'safepass',
    }

    expect.assertions(1)

    const token = await Login.login(user)
    supertest(app)
      .delete('/api/user')
      .set('Authorization', token)
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
  })
})
