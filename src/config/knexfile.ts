import { database } from './config'

export const config = {
  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      port: '5432',
      user: 'postgres',
      password: 'password',
      database: 'team-up',
    },
    migrations: {
      directory: './db/migrations',
    },
    useNullAsDefault: true,
  },
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
