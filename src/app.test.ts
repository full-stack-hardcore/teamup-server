import * as app from './app'
import { supertest } from './lib/test_helper'

describe('Test the API root path', () => {
  test('It should response the GET method from the /Api', (done) => {
    supertest(app)
      .get('/api')
      .then((response) => {
        expect(response.status).toBe(200)
        done()
      })
  })
})
