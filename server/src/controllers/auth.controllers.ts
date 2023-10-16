import { type Response, type NextFunction, type Request } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';
import { pool } from '../db'
import { AsyncRequestHandler } from './types';

const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body

  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds)
  const hash1 = bcrypt.hashSync(password, salt)

  try {
    const query = 'INSERT INTO USERS(name, email, password) VALUES($1, $2, $3)'
    const values = [name, email, hash1]

    await pool.query(query, values)
    res.status(201).json({ message: 'User created' });

  } catch (error) {
    next(error)
  }

}
const login = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body

  try {
    const query = 'SELECT * FROM users WHERE email = $1';
    const userResult = await pool.query(query, [email]);

    if (userResult.rows.length === 0) {
      res.status(401).json({ error: 'Email or Password Incorrect' });
    }

    const user = userResult.rows[0];
    const verifyPass = await bcrypt.compare(password, user.password);

    if (verifyPass) {
      const token = jwt.sign({ userId: user.id }, process.env.TOKEN_SECRET || 'secret', { expiresIn: '6h' });
      res.status(200).json({ message: 'Login Successful', token });
    } else {
      res.status(401).json({ error: 'Email or Password Incorrect' });
    }
  } catch (error) {
    next(error)
  }
}

const verify: AsyncRequestHandler = async (req, res, next) => {

  try {
    res.status(200).json(req.payload)
  } catch (error) {
    next(error)
  }
}




export {
  signup,
  login,
  verify
}