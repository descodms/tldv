import VideoModel, { Video } from '../database/models/Video'

type GenericObject = { [key: string]: any }

export default class VideoService {
  static async getAll(
    limit: number,
    getPublic: Boolean,
    timesViewed: number,
    skip: number
  ) {
    let filter = {
      ...(getPublic && { isPrivate: false }),
      ...(timesViewed && { timesViewed: { $gte: timesViewed } }),
    }
    const result = await VideoModel.find(filter)
      .limit(limit)
      .sort({ _id: -1 })
      .skip(skip)
    const count = await VideoModel.countDocuments(filter)
    return { result, count }
  }
  static async getById(videoId: string) {
    const result = await VideoModel.findById(videoId)
    return result
  }

  static async create(video: Video) {
    const result = await VideoModel.create(video)
    return result
  }
  static async update(videoId: string, data: GenericObject) {
    const result = await VideoModel.findOneAndUpdate(
      { _id: videoId },
      { $set: data },
      { returnDocument: 'after' }
    ).lean()
    return result
  }
  static async delete(videoId: string) {
    const result = await VideoModel.deleteOne({ _id: videoId })
    return result
  }
}
