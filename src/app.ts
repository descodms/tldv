import express, { Response } from 'express'
const app = express()
import requestId from './middlewares/RequestId'

app.use(requestId)
app.use(express.json())

import swaggerUi from 'swagger-ui-express'
import YAML from 'yamljs'
const swaggerDocument = YAML.load('./swagger.yaml')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

export default app
