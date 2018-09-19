export const server = {
  host: process.env.host || 'localhost',
  port: process.env.port || '3000',
}

export const database = {
  host: process.env.DB_URL || 'localhost',
  port: 5432,
  user: 'postgres',
  password: 'password',
  database: 'team-up',
}

export const keys = {
  secret: process.env.SECRET_KEY || 'secretKeyHere',
}
