import express from 'express';
import session from 'express-session';
import { join } from 'path';
import { json, urlencoded } from 'body-parser';
const MongoStore = require('connect-mongo')(session);
import cors from 'cors'

import Logger from '../logger';
const logger = new Logger();
import errorController from './errorController';
import config from '../config';
import './dbInit';



let app = express();

app.use(require('./rt').default);
app.use('/public', express.static(join(__dirname, '../public')));
app.use(require('cookie-parser')());

app.use(session({
  secret: 'Secret secret',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: require('mongoose').connection })
}));

app.use(json({
  limit: "10kb"
}));

app.use(urlencoded({
  extended: true
}));

app.use(cors())
app.use(errorController)
app.use(require('./../routes'));

app.listen(config.port, function (err) {
  if (err) throw err;
  logger.log(`Running server at port ${config.port}!`);
});
