import * as express from 'express'
import * as userCreateRouter from './create/create'
import * as userDeleteRouter from './delete/delete'
import * as userUpdateRouter from './update/update'

const router = express.Router()

router.post('/', userCreateRouter)
router.delete('/', userDeleteRouter)
router.patch('/', userUpdateRouter)

export = router
