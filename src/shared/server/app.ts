import express, { Request, Response, NextFunction } from 'express'
import 'express-async-errors'
import swaggerUi from 'swagger-ui-express'
import cors from 'cors'
import path from 'node:path'
import { errors } from 'celebrate'
import { routes } from '@shared/routes'
import { AppError } from '@shared/errors/AppError'
import swaggerFile from '../../swagger.json'
import '@shared/container'
import uploadConfig from '@config/upload'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/files', express.static(uploadConfig.directory))
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerFile))

app.use(routes)
app.use(errors())

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  console.error('Middleware de erro ativado:', error)
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({ status: 'Error', message: error.message })
  }

  return response.status(500).json({ status: 'Error', message: 'Internal server error' })
})

export { app }
