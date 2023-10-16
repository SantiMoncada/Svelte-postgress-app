import express from 'express'
import config from './config'
import './db'
import routes from './routes'

const app = express()
config(app)

app.use('/api', routes)

export default app