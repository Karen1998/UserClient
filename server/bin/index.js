// Project/index.js
process.stdout.isTTY = true
// Take from https://github.com/nodejs/node/issues/3006

import { isMaster } from 'cluster'

require('./worker')