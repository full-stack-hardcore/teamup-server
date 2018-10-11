import * as express from 'express'
import * as userCreateRouter from './create/create'
import * as userDeleteRouter from './delete/delete'
import * as userGetRouter from './get/get'
import * as userUpdateRouter from './update/update'

const router = express.Router()

router.get('/', userGetRouter)
router.post('/', userCreateRouter)
router.delete('/', userDeleteRouter)
router.patch('/', userUpdateRouter)

export = router
