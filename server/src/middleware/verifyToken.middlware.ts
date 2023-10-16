import { type Request, Response } from 'express'
import { type TokenGetter, expressjwt } from 'express-jwt'
import { type Secret } from 'jsonwebtoken'

const isAuthenticated = expressjwt({
  secret: process.env.TOKEN_SECRET || 'secret' as Secret,
  algorithms: ['HS256'],
  requestProperty: 'payload',
  getToken: getTokenFromHeaders as TokenGetter
})

function getTokenFromHeaders(req: Request, res: Response): string | undefined | null {
  if (req?.headers?.authorization?.split(' ')[0] === 'Bearer') {
    const token = req.headers.authorization.split(' ')[1]
    return token
  }

  return null
}

export { isAuthenticated }