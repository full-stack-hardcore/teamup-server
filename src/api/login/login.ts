import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import { BadRequestError, ValidationError, NotFoundError } from 'error-middleware/errors';
import { validationMiddleware } from 'error-middleware/middlewares';
import { ValidationParamSchema } from 'express-validator/check';

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

const { checkSchema, validationResult } = require('express-validator/check');

router.get('/', verifyToken, (req, res) => {
    res.send('Hello from login');
});

router.get('/secure', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKeyHere', (err, authData) => {
        if(err) {
            throw new BadRequestError('Not allowed.');
        } 
        res.json({
            message: 'Secure Route',
            authData: authData,
        });
    });
});

router.post('/secure', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKeyHere', (err, authData) => {
        if(err) {
            throw new BadRequestError('Not allowed.');
        } 
        res.json({
            message: 'Secure Route',
            authData: authData,
        });
    });
});

const schema: Record<string, ValidationParamSchema> = {
    user: {
        isEmail: true,
        in: 'query',
    },
  };

router.post('/', validationMiddleware(schema), (req, res) => {
    
    // Mock user
    const user = {
        id: 1,
        username: 'lucas',
        email: 'lucas@gmail.com'
    }
    const errors = validationResult(req);
    try {
        if (!errors.isEmpty()) {
            throw new ValidationError(errors.array());
        }
        
        // Mock database request for user login
        if(req.body.user == "lucas@gmail.com" && req.body.password == 'safepass'){
            jwt.sign({user: user}, 'secretKeyHere', { expiresIn: '30s' } ,(err, token) => {
                res.json({
                    token: token
                });
            });
        } else {
            throw new BadRequestError({
                error: "Your credentials are invalid"
              });
        }
    } catch(e) {
        res.send(e)
    }
});

function verifyToken(req, res, next) {
    const authToken = req.headers['authorization'];

    try {
        if(typeof authToken !== 'undefined') {
            req.token= authToken;
            next();
        } else {
            throw new BadRequestError('Not allowed.');
        }        
    } catch(e) {
        res.send(e)
    }
}

export = router;