require('dotenv').config();
const parse = require('url-parse');

const pg = require('pg');
pg.defaults.ssl = process.env.NODE_ENV !== 'development';

let host;
let user;
let password;
let database;
let port = '5432';
let dbUrl = {};
if (process.env.DATABASE_URL) {
  dbUrl = parse(process.env.DATABASE_URL);
  if (!(dbUrl.username && dbUrl.password && dbUrl.hostname)) {
    dbUrl = {};
  }
}

if (dbUrl.username) {
  host = dbUrl.hostname || host;
  user = dbUrl.username || user;
  password = dbUrl.password || password;
  const db =
    dbUrl.pathname && dbUrl.pathname.startsWith('/')
      ? dbUrl.pathname.substr(1)
      : dbUrl.pathname;
  database = db || database;
  port = dbUrl.port || port;
} else {
  host = process.env.DB_HOST || host;
  user = process.env.DB_USER || user;
  password = process.env.DB_PASSWORD || password;
  database = process.env.DB_NAME || database;
  port = process.env.DB_PORT || port;
}

console.log(`DB host: ${host}`);
console.log(`DB user: ${user}`);

module.exports = {
  client: 'pg',
  connection: {
    host,
    user,
    password,
    database,
    port,
  },
  onUpdateTrigger: (table) => `
    CREATE TRIGGER ${table}_updated_at
    BEFORE UPDATE ON "${table}"
    FOR EACH ROW
    EXECUTE PROCEDURE on_update_timestamp();
  `,
};
