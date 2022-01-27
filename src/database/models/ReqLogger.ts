import mongoose, { Schema, Document } from 'mongoose'

export interface ReqLogger extends Document {
  interactionType: string
  requestId: string
  actions: object
  error?: object
}

const ReqLoggerSchema: Schema = new Schema(
  {
    interactionType: {
      type: String,
      required: true,
    },
    requestId: {
      type: String,
      required: true,
    },
    actions: {
      type: Object,
      required: true,
    },
    error: Object,
  },
  { timestamps: true, collection: 'reqlogger' }
)

export default mongoose.model<ReqLogger>('logger', ReqLoggerSchema)
