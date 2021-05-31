import { verify } from 'jsonwebtoken';
import config from '../config';

const checkToken = (req, res, next) => {
  verify(req.token, config.secret_token, (err) => {
    if (err) {
      res.status(401).json({
        status: false,
        msg: 'Unauthorized'
      });
    } else {
      next();
    }
  });
};

export default checkToken;
