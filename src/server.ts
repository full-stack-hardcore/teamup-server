import * as app from './app'
import { server } from './config/config'

app.listen(server.port, () => {
  console.log(`Listening at http://${server.host}:${server.port}/`)
})
