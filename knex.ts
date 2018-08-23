import * as knex from 'knex'

import * as knexConfig from './knexfile.js'
// knexConfig.debug = true;
export default knex(knexConfig)
