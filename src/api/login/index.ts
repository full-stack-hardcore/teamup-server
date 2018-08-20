import * as express from 'express';
import * as loginRouter from './login';
import * as asyncHandler from 'express-async-handler';

const router = express.Router();

router.use('/', loginRouter);

export = router;
