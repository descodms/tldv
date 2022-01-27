import mongoose, { Schema } from 'mongoose'

export interface Video {
  _id?: String
  name: String
  url: String
  thumbnailUrl: String
  isPrivate: Boolean
  timesViewed: Number
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
