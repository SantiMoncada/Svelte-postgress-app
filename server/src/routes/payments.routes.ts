import express from 'express'
import { payments } from '../controllers/payments.controllers'
import { isAuthenticated } from '../middleware/verifyToken.middlware'

const router = express.Router()

router.get('/', isAuthenticated, payments)

export default router