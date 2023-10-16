import express from 'express'
import { getTask } from '../controllers/task.controllers'
import { isAuthenticated } from '../middleware/verifyToken.middlware'

const router = express.Router()

router.get('/', isAuthenticated, getTask)

export default router