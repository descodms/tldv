import BadRequest from '../shared/errors/BadRequest'
import NotFound from '../shared/errors/NotFound'
import { Video } from '../database/models/Video'
import { Request, Response, NextFunction } from 'express'
import VideoService from '../services/VideoService'
const ObjectId = require('mongoose').Types.ObjectId
import logger from '../shared/utils/logger'
import NotionService from '../services/NotionService'
export default class VideoController {
  static async getAll(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let {
      limit = 20,
      getPublic = false,
      timesViewed = null,
      page = 1,
    } = req.query
    const skip = (Number(page) - 1) * Number(limit)
    logger.info(`Getting videos from database...`)
    let { result, count } = await VideoService.getAll(
      Number(limit),
      Boolean(getPublic),
      Number(timesViewed),
      skip
    )
    const pages = Math.ceil(count / Number(limit))
    const prevPage = page > 1 ? Number(page) - 1 : null
    const nextPage = page < pages ? Number(page) + 1 : null
    res.status(200)
    res.send({
      status: 'OK',
      results: result.length,
      pagination: { pages, prevPage, nextPage },
      data: result,
    })
    next()
  }

  static async getById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let id = ''
    try {
      id = this.getIdFromParams(req)
    } catch (error) {
      next(error)
      return
    }
    logger.info(`Getting video with id: ${id} from database...`)
    const result = await VideoService.getById(id)
    if (!result) {
      next(
        new NotFound(
          {
            entity: `Video`,
            query: { videoId: id },
          },
          `Video ${id} not found`
        )
      )
      return
    }
    res.status(200)
    res.send({
      status: 'OK',
      message: `Video ${result._id} obtained`,
      data: result,
    })
  }

  static async create(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const video: Video = req.body
    logger.info(`Creating new video in database...`)
    let result
    try {
      result = await VideoService.create(video)
      const notionService = new NotionService()
      await notionService.addItem(video.url)
    } catch (error) {
      next(
        new BadRequest(
          { message: 'required data not present' },
          'required data not present'
        )
      )
      return
    }
    res.status(200)
    res.send({
      status: 'OK',
      message: `Video with id: ${result._id} created`,
      data: result,
    })
  }

  static async update(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    let id = ''
    try {
      id = this.getIdFromParams(req)
    } catch (error) {
      next(error)
      return
    }
    const data = req.body
    logger.info(`Updating video with id: ${id} in database...`)
    const result = await VideoService.update(id, data)
    if (!result) {
      next(
        new NotFound(
          {
            entity: `Video`,
            query: { videoId: id },
          },
          `Video ${id} not found`
        )
      )
      return
    }
    res.status(200)
    res.send({ status: 'OK', message: `Video ${id} updated`, data: result })
  }

  static async delete(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const id = this.getIdFromParams(req)
    logger.info(`Deleting video with id: ${id} in database...`)
    const result = await VideoService.delete(id)
    if (result && result.deletedCount === 0) {
      next(
        new NotFound(
          {
            entity: `Video`,
            query: { videoId: id },
          },
          `Video ${id} not found`
        )
      )
      return
    }
    res.status(200)
    res.send({ status: 'OK', message: `Video ${id} deleted` })
  }

  private static getIdFromParams(req: Request) {
    const { id } = req.params
    if (!id || !this.isObjectIdValid(id)) {
      throw new BadRequest(
        { message: 'required data not present' },
        'required data not present'
      )
    }
    return id
  }

  private static isObjectIdValid(id: string): boolean {
    return ObjectId.isValid(id) && new ObjectId(id) == id
  }
}
