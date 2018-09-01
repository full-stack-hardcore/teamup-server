import { database } from './config'

export const config = {
  client: 'pg',
  connection: {
    host: database.host,
    port: database.port,
    user: database.user,
    password: database.password,
    database: database.name,
  },
  migrations: {
    directory: './db/migrations',
  },
  useNullAsDefault: true,
}
