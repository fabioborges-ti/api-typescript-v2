import { inject, injectable } from 'tsyringe'
import { IUserRepository } from '@repositories/interfaces/IUsersRepository'
import { ListParams } from '@dtos/Commons/ListParams'
import { UsersPaginateParams } from '@dtos/Users/UsersPaginateParams'

@injectable()
export class ListUsersUseCase {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  async execute({ page, limit }: ListParams): Promise<UsersPaginateParams> {
    const take = limit
    const skip = (Number(page) - 1) * take

    return await this.userRepository.findAll({ page, skip, take })
  }
}
