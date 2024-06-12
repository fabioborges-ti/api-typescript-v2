import { Router } from 'express'
import { rolesRouter } from './roles.routes'
import { usersRouter } from './users.routes'

const routes = Router()

routes.get('/', (request, response) => {
  return response.json({ message: 'Home' })
})

routes.use('/roles', rolesRouter)
routes.use('/users', usersRouter)

export { routes }
