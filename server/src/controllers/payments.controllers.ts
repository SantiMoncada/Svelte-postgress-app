import { NextFunction, Request, Response } from "express";
import { pool } from "../db";

const payments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let { limit, skip } = req.query

    const queryLimit = typeof limit === 'string' ? parseInt(limit) : 10;
    const querySkip = typeof skip === 'string' ? parseInt(skip) : 0;

    const query = `
    SELECT PAYMENTS.id, amount, paid_status, paid_date, CLIENTS.name, CLIENTS.email, CLIENTS.status, CLIENTS.lastlogin  FROM PAYMENTS 
    INNER JOIN CLIENTS ON client_id = CLIENTS.id 
    LIMIT $1 
    OFFSET $2`

    const result = await pool.query(query, [queryLimit, querySkip]);

    const countingQuery = `SELECT COUNT(*) FROM PAYMENTS`;
    const Nresults = await pool.query(countingQuery);

    res.status(200).json({ payments: result.rows, total: Nresults.rows[0].count });


  } catch (error) {
    next(error)
  }
}

export {
  payments
}
