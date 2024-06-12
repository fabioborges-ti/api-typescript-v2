import { Role } from '@entities/Role'

interface RolesPaginateParams {
  per_page: number
  total: number
  current_page: number
  data: Role[]
}

export { RolesPaginateParams }
