import * as express from 'express';
import * as loginRouter from './login';
import * as welcomeRouter from './welcome';
import * as asyncHandler from 'express-async-handler';


const router = express.Router();

router.use('/welcome', welcomeRouter);
router.use('/login', loginRouter);

router.get('/', (req, res) => {
    // Reply with a hello world when no name param is provided
    res.send('Hello from the API');
});

export = router;
