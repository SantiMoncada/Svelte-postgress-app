import express from 'express'
import { signup, login, verify } from '../controllers/auth.controllers'
import { isAuthenticated } from '../middleware/verifyToken.middlware'

const router = express.Router()

router.post('/signup', signup)
router.post('/login', login)
router.get('/verify', isAuthenticated, verify)


export default router