import { Router } from 'express'
import { celebrate, Joi, Segments } from 'celebrate'
import { container } from 'tsyringe'
import multer from 'multer'
import { CreateUserController } from '@controllers/Users/CreateUserController'
import { ListUsersController } from '@controllers/Users/ListUsersController'
import { CreateLoginController } from '@controllers/Login/CreateLoginController'
import { checkToken } from '@shared/middlewares/checkToken'
import uploadConfig from '@config/upload'
import { UpdateAvatarController } from '@controllers/Users/UpdateAvatarController'
import { ShowProfileController } from '@controllers/Users/ShowProfileController'

const usersRouter = Router()

const createUserController = container.resolve(CreateUserController)
const listUsersController = container.resolve(ListUsersController)
const createLoginController = container.resolve(CreateLoginController)
const updateAvatarController = container.resolve(UpdateAvatarController)
const showProfileController = container.resolve(ShowProfileController)

const upload = multer(uploadConfig)

usersRouter.post(
  '/',
  checkToken,
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      isAdmin: Joi.boolean().required(),
      roleId: Joi.string().uuid().required(),
    },
  }),
  (request, response) => {
    return createUserController.handle(request, response)
  },
)

usersRouter.get(
  '/',
  checkToken,
  celebrate({
    [Segments.QUERY]: {
      page: Joi.number(),
      limit: Joi.number(),
    },
  }),
  (request, response) => {
    return listUsersController.handle(request, response)
  },
)

usersRouter.post(
  '/login',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  (request, response) => {
    return createLoginController.handle(request, response)
  },
)

usersRouter.patch('/avatar', checkToken, upload.single('avatar'), (request, response) => {
  return updateAvatarController.handle(request, response)
})

usersRouter.get('/profile', (request, response) => {
  return showProfileController.handle(request, response)
})

export { usersRouter }
