import * as express from 'express';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello, World!');
});

router.post(
    '/',
    
    (req, res) => {
        const { fields } = req.body;
        try{
            if(req.body.password == "123456"){
                var userData = [{'1':1, '2':2}];
                res.send(userData);
            } else {
               throw "validation error";
            }
        } catch (e) {
            var error = [{'error':"login failed",  "wrong_pass": req.body.password, "msg": e}];
            res.send(error);
        }
    }
);

router.post('/data', (req, res) => {
    const postBody = req.body;
    console.log(postBody);
    res.status(200).send(req.body);
  });

router.post('/users', function (req, res) {
    console.log(req.body);
    res.status(200).send(req.body);
});

export = router;