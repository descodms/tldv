import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'

const router = Router()

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200)
  res.send({ status: 'OK' })
})

export default router
