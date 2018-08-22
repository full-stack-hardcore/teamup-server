import * as express from 'express';
import * as loginRouter from './login';
import * as welcomeRouter from './welcome';

const router = express.Router();
router.use('/welcome', welcomeRouter);
router.use('/login', loginRouter);

router.get('/', (req, res) => {
  res.send('Hello from the API');
});

export = router;
