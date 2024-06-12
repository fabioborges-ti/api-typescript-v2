import { container } from 'tsyringe'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { IUserRepository } from '@repositories/interfaces/IUsersRepository'
import { RolesRepository } from '@repositories/RolesRepository'
import { UserRepository } from '@repositories/UserRepository'
import { CreateRoleController } from '@controllers/Roles/CreateRoleController'
import { DeleteRoleController } from '@controllers/Roles/DeleteRoleController'
import { ListRolesController } from '@controllers/Roles/ListRolesController'
import { ShowRoleController } from '@controllers/Roles/ShowRoleController'
import { UpdateRoleController } from '@controllers/Roles/UpdateRoleController'
import { CreateUserController } from '@controllers/Users/CreateUserController'
import { ListUsersController } from '@controllers/Users/ListUsersController'
import { CreateLoginController } from '@controllers/Login/CreateLoginController'
import { UpdateAvatarController } from '@controllers/Users/UpdateAvatarController'
import { ShowProfileController } from '@controllers/Users/ShowProfileController'

// ROLES
container.registerSingleton<IRolesRepository>('RolesRepository', RolesRepository)
container.registerSingleton('CreateRoleController', CreateRoleController)
container.registerSingleton('ListRolesController', ListRolesController)
container.registerSingleton('ShowRoleController', ShowRoleController)
container.registerSingleton('UpdateRoleController', UpdateRoleController)
container.registerSingleton('DeleteRoleController', DeleteRoleController)

// USERS
container.registerSingleton<IUserRepository>('UserRepository', UserRepository)
container.registerSingleton('CreateUserController', CreateUserController)
container.registerSingleton('ListUsersController', ListUsersController)
container.registerSingleton('UpdateAvatarController', UpdateAvatarController)
container.registerSingleton('ShowProfileController', ShowProfileController)

// LOGIN
container.registerSingleton('CreateLoginController', CreateLoginController)
