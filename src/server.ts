import * as express from 'express';
import * as bodyParser from 'body-parser';

import errorMiddleware from 'error-middleware';

import * as masterRouter from './api';

const app: express.Application = express();
const port: string = process.env.PORT || '3000';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use('/api', masterRouter);
app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/`);
});
