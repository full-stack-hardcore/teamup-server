import * as express from 'express'
import * as loginRouter from './login/login'
import * as userRouter from './user'
import * as welcomeRouter from './welcome'

const router = express.Router()
router.use('/welcome', welcomeRouter)
router.use('/login', loginRouter)
router.use('/user', userRouter)

router.get('/', (req, res) => {
  res.send('Hello from the API')
})

export = router
