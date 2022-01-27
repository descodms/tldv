import { uuid } from 'uuidv4'
import { Request, Response, NextFunction } from 'express'

/***
 * Transaction Id middleware
 * @return {Function}
 */

export interface CustomRequest extends Request {
  requestId?: string
}

function requestId(req: CustomRequest, res: Response, next: NextFunction) {
  const requestId = uuid()
  req.requestId = requestId
  next()
}

export default requestId
