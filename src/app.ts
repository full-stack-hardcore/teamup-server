import * as bodyParser from 'body-parser'
import * as express from 'express'

import errorMiddleware from 'error-middleware'

import * as dotenv from 'dotenv'
import * as masterRouter from './api'

dotenv.config()

const app: express.Application = express()

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use('/api', masterRouter)
app.use(errorMiddleware)

module.exports = app
