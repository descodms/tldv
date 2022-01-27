import VideoController from '../controllers/VideoController'
import { Router } from 'express'
import { Request, Response, NextFunction } from 'express'
import reqLogger from '../middlewares/ReqLogger'
import validator from '../middlewares/Validator'

const router = Router()

router.get(
  '/videos',
  async (req: Request, res: Response, next: NextFunction) => [
    await reqLogger('get-videos', req, res, next),
  ],
  async (req: Request, res: Response, next: NextFunction) =>
    await VideoController.getAll(req, res, next)
)
router.get(
  '/video/:id',
  async (req: Request, res: Response, next: NextFunction) => [
    await reqLogger('get-video-by-id', req, res, next),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    await VideoController.getById(req, res, next)
  }
)
router.post(
  '/video',
  (req: Request, res: Response, next: NextFunction) => [
    reqLogger('post-video', req, res, next),
    validator(req, res, next),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    VideoController.create(req, res, next)
  }
)
router.put(
  '/video/:id',
  async (req: Request, res: Response, next: NextFunction) => [
    await reqLogger('put-video', req, res, next),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    await VideoController.update(req, res, next)
  }
)
router.delete(
  '/video/:id',
  async (req: Request, res: Response, next: NextFunction) => [
    await reqLogger('delete-video', req, res, next),
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    await VideoController.delete(req, res, next)
  }
)

export default router
