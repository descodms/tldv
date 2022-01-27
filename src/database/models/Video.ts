import mongoose, { Schema } from 'mongoose'

export interface Video {
  _id?: string
  name: string
  url: string
  thumbnailUrl: string
  isPrivate: boolean
  timesViewed: number
}

const VideoSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
    isPrivate: {
      type: Boolean,
      required: true,
    },
    timesViewed: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, collection: 'videos' }
)

export default mongoose.model('video', VideoSchema)
