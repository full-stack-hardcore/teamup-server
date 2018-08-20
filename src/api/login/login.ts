import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as jwt from 'jsonwebtoken';
import * as expressValidator from 'express-validator/check';

class Token {
    constructor(public token) {
    }
  
    log(message: string) {
      console.log(this.token, { message });
    }
  }

declare global {
    namespace Express {
      interface Request {
        token: Token
      }
    }
  }

const router = express.Router();

const { check, validationResult } = require('express-validator/check');

// router.use(bodyParser.json());
// router.use(bodyParser.urlencoded({
//   extended: true
// }));

router.get('/', verifyToken, (req, res) => {
    res.send('Hello from login');
});

router.get('/secure', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKeyHere', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Secure Route',
                authData: authData,
            });
        }
    });
});

router.post('/secure', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKeyHere', (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({
                message: 'Secure Route',
                authData: authData,
            });
        }
    });
});

router.post('/', [
    check('user').isLength({ min: 3 }).withMessage('user must be at least 3 chars long'),
    check('password').isLength({ min: 5 }).withMessage('password must be at least 5 chars long')
], (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    // Mock user
    const user = {
        id: 1,
        username: 'lucas',
        email: 'lucas@gmail.com'
    }

    // Mock database request for user login
    if(req.body.user == "lucas" && req.body.password == 'safepass'){
        jwt.sign({user: user}, 'secretKeyHere', { expiresIn: '30s' } ,(err, token) => {
            res.json({
                token: token
            });
        });
    } else {
        res.send('Your credentials are invalid');
    }
});

// Verify Token

function verifyToken(req, res, next) {
    // Get auth header value
    const authToken = req.headers['authorization'];
    // Check if token is undefined
    if(typeof authToken !== 'undefined') {
        // Set the token
        req.token= authToken;
        // Next middleware
        next();
    } else {
        // Forbidden
        res.sendStatus(403);
    }

}

export = router;