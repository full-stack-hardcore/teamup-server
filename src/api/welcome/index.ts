import * as express from 'express';
import * as welcomeRouter from './welcome';

const router = express.Router();

router.use('/', welcomeRouter);

export = router;
