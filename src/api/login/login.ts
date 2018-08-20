import * as express from 'express';
import * as jwt from 'jsonwebtoken';

class Token {
  constructor(public token) {}

  log(message: string) {
    console.log(this.token, { message });
  }
}

declare global {
  namespace Express {
    interface Request {
      token: Token;
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
    if (err) {
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
    if (err) {
      res.sendStatus(403);
    } else {
      res.json({
        message: 'Secure Route',
        authData: authData,
      });
    }
  });
});

router.post(
  '/',
  checkSchema({
    user: {
      isEmail: {
        isEmail: true,
        errorMessage: 'Invalid email',
      },
    },
    password: {
      isLength: {
        errorMessage: 'Password should be at least 5 chars long',
        options: { min: 5 },
      },
    },
  }),
  (req, res) => {
    // Mock user
    const user = {
      id: 1,
      username: 'lucas',
      email: 'lucas@gmail.com',
    };
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
  
    // Mock database request for user login
    if (req.body.user == 'lucas@gmail.com' && req.body.password == 'safepass') {
      jwt.sign({ user: user }, 'secretKeyHere', { expiresIn: '30s' }, (err, token) => {
        res.json({
          token: token,
        });
      });
    } else {
      res.send('Your credentials are invalid');
    }
  },
);

function verifyToken(req, res, next) {
    const authToken = req.headers['authorization'];
    if(typeof authToken !== 'undefined') {
        req.token= authToken;
        next();
    } else {
        res.sendStatus(403);
    }
}

export = router;
