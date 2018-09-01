import * as bodyParser from 'body-parser'
import * as express from 'express'

import errorMiddleware from 'error-middleware'

import * as dotenv from 'dotenv'
import * as masterRouter from './api'
import { server } from './config/config'

dotenv.config()
const app: express.Application = express()
const port: string = server.port || '3000'

app.use(bodyParser.json())
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
)

app.use('/api', masterRouter)
app.use(errorMiddleware)

app.listen(port, () => {
  console.log(`Listening at http://${server.host}:${port}/`)
})
