let app = new (require('express').Router)()
import userController from '../controllers/user'

app.use('/', userController)

export default app
