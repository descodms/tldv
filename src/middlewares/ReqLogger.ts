import { Request, Response, NextFunction } from 'express'
import ReqLoggerModel, { ReqLogger } from '../database/models/ReqLogger'
import { CustomRequest } from './RequestId'
/***
 * Request logger middleware
 * @return {Function}
 */

async function ReqLogger(
  interactionType: string,
  req: CustomRequest,
  res: Response,
  next: NextFunction
) {
  const log = {
    interactionType,
    requestId: req.requestId,
    actions: {
      params: req.params,
      queryParams: req.query,
      body: req.body,
    },
  }
  await ReqLoggerModel.create(log)
  next()
}

export default ReqLogger
