let app = new (require('express').Router)()
import { User } from '../models'
import config from '../config'
import jwt from 'jsonwebtoken'
import verifyToken from '../middleware/verifyToken'
import checkToken from '../middleware/checkToken'


app.post('/signin', function (req, res, next) {
  if (!req.body.login || !req.body.password) {
    return res.status(200).json({
      status: false,
      msg: 'Provide login/password'
    })
  }

  User.findOne({ email: req.body.login }, (err, user) => {
    if (err) {
      next(err)
      throw err;
    }

    if (!user) {
      return res.status(200).json({
        status: false,
        msg: 'User not found'
      })
    }

    if (user.comparePassword(req.body.password, user.password)) {
      jwt.sign({ login: user.login }, config.secret_token, { expiresIn: `${config.exp + 'h'}` }, (err, token) => {
        res.status(200).json({
          status: true,
          msg: 'Login success',
          token,
          user: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            phone: user.phone,
          },
          exp: Date.now() + config.exp * 60 * 60 * 1000 // in milliseconds
        })
      })
    } else {
      res.status(200).json({
        status: false,
        msg: 'Password or email wrong',
      })
    }
  })
})

app.post('/signup', function (req, res, next) {
  if (!req.body.first_name ||
    !req.body.email ||
    !req.body.password
  ) {
    return res.status(200).json({
      status: false,
      msg: 'Provide data'
    })
  }

  const newUser = {
    last_name: '',
    phone: '',
    ...req.body,
  }

  let user = new User(newUser);

  user.password = user.setPassword(req.body.password);

  user.save()
    .then(() => {
      res.status(201).json({
        status: true,
        msg: 'User created',
      })
    })
    .catch(next)
})

app.get('/find', verifyToken, checkToken, (req, res, next) => {
  if (!req.query.email) {
    return res.status(200).json({
      status: false,
      msg: 'Provide email'
    })
  }

  User
    .findOne({
      email: req.query.email
    }, (err, user) => {
      if (err) {
        next(err)
        throw err;
      }
  
      if (!user) {
        return res.status(200).json({
          status: true,
          msg: 'User not found'
        })
      }

      res.status(200).json({
        status: true,
        user: {
          first_name: user.first_name,
          last_name: user.last_name,
          phone: user.phone,
        }
      })
    })
    .catch(next)
})

export default app
