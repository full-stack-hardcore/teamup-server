/* app/server.ts */

// Import everything from express and assign it to the express variable
import * as express from 'express';
import * as bodyParser from 'body-parser';

// Import WelcomeController from controllers entry point
import * as masterRouter from './api';

// Create a new express application instance
const app: express.Application = express();
// The port the express app will listen on
const port: string = process.env.PORT || '3000';

// Mount the WelcomeController at the /welcome route
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);

app.use('/api', masterRouter);

// Serve the application at the given port
app.listen(port, () => {
  // Success callback
  console.log(`Listening at http://localhost:${port}/`);
});
