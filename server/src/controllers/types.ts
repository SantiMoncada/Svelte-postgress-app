import { type Response, type NextFunction, type Request } from 'express'

export interface PayloadRequest extends Request {
  payload?: { userId: string }
}

export type AsyncRequestHandler = (req: PayloadRequest, res: Response, next: NextFunction) => Promise<void>