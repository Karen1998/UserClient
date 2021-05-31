import multer from 'multer'

const upload = multer()
let app = new (require('express').Router)()

app.use('/api', upload.none(), require('./user').default)

module.exports = app
