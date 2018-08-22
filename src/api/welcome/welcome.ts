import * as express from 'express'

const router = express.Router()

router.get('/', (req, res) => {
  res.send('Hello, World!')
})

router.post('/data', (req, res) => {
  const postBody = req.body
  res.status(200).send(req.body)
})

router.post('/users', (req, res) => {
  res.status(200).send(req.body)
})

export = router
