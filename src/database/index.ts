import mongoose, { ConnectOptions } from 'mongoose'
import logger from '../shared/utils/logger'

const uri = process.env.MONGO_URI || ''

let isConnected: Number
let db: any

const connectDB = async () => {
  if (isConnected) return db

  try {
    const db = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as ConnectOptions)
    isConnected = db.connections[0].readyState
    return db
  } catch (err: any) {
    logger.info(err)
    throw new Error(err)
  }
}

export default connectDB
