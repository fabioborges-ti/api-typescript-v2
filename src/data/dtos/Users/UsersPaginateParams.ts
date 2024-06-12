import { User } from '@entities/User'

interface UsersPaginateParams {
  per_page: number
  total: number
  current_page: number
  data: User[]
}

export { UsersPaginateParams }
