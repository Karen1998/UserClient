import { on, fork } from 'cluster'

const CPUCount = 1

import Logger from '../logger'
const logger = new Logger()

on('disconnect', (worker, code, signal) => {
  logger.log(`Worker ${worker.id} died`)
  fork()
})

on('online', (worker) => {
  logger.log(`Worker ${worker.id} running`)
})

for (let i = 0; i < CPUCount; ++i) {
  fork()
}
