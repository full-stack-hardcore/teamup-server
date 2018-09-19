import * as express from 'express'
import * as loginRouter from './login/login'
import * as userRouter from './user'

const router = express.Router()
router.use('/login', loginRouter)
router.use('/user', userRouter)

router.get('/', (req, res) => {
  res.send('Hello from the API')
})

export = router
