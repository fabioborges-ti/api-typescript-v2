import { PaginateParams } from '@dtos/Commons/PaginateParams'
import { CreateUserParams } from '@dtos/Users/CreateUserParams'
import { UsersPaginateParams } from '@dtos/Users/UsersPaginateParams'
import { User } from '@entities/User'
import { IUserRepository } from '@repositories/interfaces/IUsersRepository'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'

export class UserRepository implements IUserRepository {
  private repository: Repository<User>

  constructor() {
    this.repository = dataSource.getRepository(User)
  }

  async create({ name, email, password, isAdmin, role }: CreateUserParams): Promise<User> {
    const user = this.repository.create({ name, email, password, isAdmin, role })
    return this.repository.save(user)
  }

  async save(user: User): Promise<User> {
    return await this.repository.save(user)
  }

  async findAll({ page, skip, take }: PaginateParams): Promise<UsersPaginateParams> {
    const [users, count] = await this.repository
      .createQueryBuilder('r')
      .leftJoinAndSelect('r.role', 'role')
      .skip(skip)
      .take(take)
      .getManyAndCount()

    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: users,
    }

    return result
  }

  async findById(id: string): Promise<User | null> {
    return await this.repository.findOneBy({ id })
  }

  async findByName(name: string): Promise<User | null> {
    return await this.repository.findOneBy({ name })
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.repository.findOneBy({ email })
  }

  async delete(user: User): Promise<void> {
    await this.repository.remove(user)
  }
}
