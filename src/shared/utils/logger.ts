import { createLogger, Logger, transports, format } from 'winston'
const { combine, timestamp, colorize, json, simple } = format

const logger = createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: combine(timestamp(), json(), colorize()),
  transports: [new transports.Console({ format: simple() })],
})

export default logger
