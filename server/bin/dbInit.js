// DB init
import { Promise as PPromise, connect, connection } from 'mongoose'
import Logger from '../logger'
const logger = new Logger()
let Promise = PPromise;
Promise = require('bluebird')

import config from '../config'

connect(config.mongoUri, {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	poolSize: 10
})

connection.on('error', (err) => {
	logger.error('Database Connection Error: ' + err)
	logger.error('Run your MongoDB server!')
	process.exit(2)
})

connection.on('connected', () => {
	logger.info('Successfully connected to MongoDB Database')
})

import '../models' // Models init
