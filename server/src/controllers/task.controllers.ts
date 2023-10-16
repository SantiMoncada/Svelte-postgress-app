import { pool } from "../db"
import { AsyncRequestHandler } from "./types"

const getTask: AsyncRequestHandler = async (req, res, next) => {

  if (!req.payload) {
    res.status(401)
    return
  }

  const { userId } = req.payload

  try {
    const query = 'SELECT * FROM TASK WHERE user_id = $1'
    const result = await pool.query(query, [userId])
    res.status(200).json(result.rows)
  } catch (error) {
    next(error)
  }

}

export {
  getTask
}
