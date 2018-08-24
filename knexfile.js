const pg = require('pg');
pg.defaults.ssl = process.env.NODE_ENV !== 'development';

module.exports = {
  development: {
    client: 'pg',
    connection: {
      host : 'localhost',
      port: '5432',
      user : 'postgres',
      password : 'password',
      database : 'team-up'
    },
    migrations: {
      directory: './db/migrations'
    },
    useNullAsDefault: true
  },
  client: 'pg',
  connection: {
    host : 'localhost',
    port: '5432',
    user : 'postgres',
    password : 'password',
    database : 'team-up'
  },
  migrations: {
    directory: './db/migrations'
  },
  useNullAsDefault: true
}
