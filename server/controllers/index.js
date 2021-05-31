let app = new (require('express').Router)()

app.use(require('./user'))

export default app
