import logger from './shared/utils/logger'
import connectDb from './database'
import app from './app'
import * as Sentry from '@sentry/node'
import * as Tracing from '@sentry/tracing'
import statusRouter from './routers/StatusRouter'
import baseRouter from './routers/BaseRouter'
import winston from 'winston'
import expressWinston from 'express-winston'
import { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import seedDatabase from './init/seedDatabase'

const sentryDsn = process.env.SENTRY_DSN || ''

Sentry.init({
  dsn: sentryDsn,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
})

app.use(
  expressWinston.logger({
    transports: [new winston.transports.Console()],
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.json()
    ),
  })
)
const apiPrefix = process.env.API_PREFIX || '/api/v1'
app.use(apiPrefix, baseRouter)
app.use(apiPrefix, statusRouter)

app.use(
  Sentry.Handlers.errorHandler({
    shouldHandleError(error) {
      // Capture all 404 and 500 errors
      if (error.status === 404 || error.status === 500) {
        return true
      }
      return false
    },
  })
)

app.use(
  (
    error: ErrorRequestHandler,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    logger.info(`Error Handling Middleware called`)
    logger.info(`Path: `, req.path)
    next(error)
    res.json(error)
  }
)
const PORT = process.env.PORT || 4040

const start = async () => {
  try {
    logger.info(`Connecting to database`)
    await connectDb()
    await seedDatabase()
    logger.info(`Connected to database`)

    await app.listen(PORT)
    logger.info(`Express Server started on port: ${PORT}`)
  } catch (error) {
    logger.info(`An Error Ocurred starting the server on port: ${PORT}`)
  }
}

start()

export default app
