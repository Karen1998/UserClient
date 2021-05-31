import express from 'express'
let app = new (require('express').Router)()

app.use(require('./verifyToken').default)

export default app
