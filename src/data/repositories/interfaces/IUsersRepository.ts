import { PaginateParamsDto } from '@entities/interfaces/Commons/PaginateParamsDto'
import { CreateUserDto } from '@shared/interfaces/Users/CreateUserDto'
import { UsersPaginateDto } from '@shared/interfaces/Users/UsersPaginateDto'
import { User } from '@entities/User'

interface IUserRepository {
  create({ name, email, password, isAdmin, role }: CreateUserDto): Promise<User>
  save(user: User): Promise<User>
  findAll({ page, skip, take }: PaginateParamsDto): Promise<UsersPaginateDto>
  findById(id: string): Promise<User | null>
  findByName(name: string): Promise<User | null>
  findByEmail(email: string): Promise<User | null>
  delete(user: User): Promise<void>
}

export { IUserRepository }
