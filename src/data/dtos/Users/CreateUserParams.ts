import { Role } from '@entities/Role'

interface CreateUserParams {
  name: string
  email: string
  password: string
  isAdmin: boolean
  roleId: string
  role: Role
}

export { CreateUserParams }
