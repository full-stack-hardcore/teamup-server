/* app/controllers/index.ts */
import * as express from 'express';
import * as apiRoutes from './api';

const router = express.Router();

router.use('/api', apiRoutes);

router.get('/', (req, res) => {
    // Reply with a hello world when no name param is provided
    res.send('Hello, from the server!');
});

export = router;