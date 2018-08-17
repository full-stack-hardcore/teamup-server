/* app/controllers/welcome.controller.ts */

// Import only what we need from express
import * as express from 'express';
import * as asyncHandler from 'express-async-handler';
import * as bodyParser from 'body-parser';

// Assign router to the express.Router() instance
const router = express.Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({
  extended: true
}));

// The / here corresponds to the route that the WelcomeController
// is mounted on in the server.ts file.
// In this case it's /welcome
router.get('/', (req, res) => {
    // Reply with a hello world when no name param is provided
    res.send('Hello, World!');
});

router.post(
    '/',
    
    (req, res) => {
        const { fields } = req.body;
        console.log(fields);
        console.log(req.body);
        console.log(req.body.user);
        console.log(req.body.password);
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

// Export the express.Router() instance to be used by server.ts
export = router;