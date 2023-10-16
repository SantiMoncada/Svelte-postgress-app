import express from 'express'
import authRoutes from './auth.routes'
import paymentsRoutes from './payments.routes'
import taskRoutes from './task.routes'

const router = express.Router()

router.use('/auth', authRoutes)
router.use('/payments', paymentsRoutes)
router.use('/task', taskRoutes)

export default router