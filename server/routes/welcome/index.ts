import * as express from 'express';
import * as welcomeRouter from './welcome';
import * as asyncHandler from 'express-async-handler';

const router = express.Router();

router.use('/welcome', welcomeRouter);

router.use(
  '/',
  asyncHandler(async (req, res) => {

  }),
);

export = router;
