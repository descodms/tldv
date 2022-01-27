import { Request, Response, NextFunction } from 'express'
import validatorCheck from 'validator'
import BadRequest from '../shared/errors/BadRequest'

function validator(req: Request, res: Response, next: NextFunction) {
  const { name, url, thumbnailUrl, timesViewed } = req.body
  if (!name || validatorCheck.isEmpty(name)) {
    res.status(400)
    next(new BadRequest({}, 'name is empty'))
    return
  }
  if (!url || !validatorCheck.isURL(url)) {
    res.status(400)
    next(new BadRequest({}, 'URL is malformed'))
    return
  }
  if (!thumbnailUrl || !validatorCheck.isURL(thumbnailUrl)) {
    res.status(400)
    next(new BadRequest({}, 'thumbnailUrl is empty'))
    return
  }
  next()
}
export default validator
