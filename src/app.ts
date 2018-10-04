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

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, authorization')
  res.header('Access-Control-Allow-Methods', 'GET, POST,HEAD, OPTIONS,PUT, DELETE, PATCH')

  next()
})

app.use('/api', masterRouter)
app.use(errorMiddleware)

export = app
