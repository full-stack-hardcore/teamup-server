/* app/controllers/index.ts */
import * as express from 'express';
import * as route from './welcome';

const router = express.Router();

router.use('/', route);

export = router;