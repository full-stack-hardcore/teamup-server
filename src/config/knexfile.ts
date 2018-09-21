import { database } from './config'

module.exports = {
  client: 'pg',
  connection: {
    ...database,
  },
  migrations: {
    directory: '../../db/migrations',
  },
}
