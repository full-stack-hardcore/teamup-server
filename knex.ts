import * as knex from 'knex'
import * as knexConfig from './knexfile.js'

if (process.env.NODE_ENV !== 'production') {
  knexConfig.debug = true
}

export default knex(knexConfig)
