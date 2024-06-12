import { inject, injectable } from 'tsyringe'
import { User } from '@entities/User'
import { IUserRepository } from '@repositories/interfaces/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { IdParam } from '@dtos/Commons/IdParam'

@injectable()
export class ShowProfileUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute({ userId }: IdParam): Promise<User> {
    const user = await this.userRepository.findById(userId)
    if (!user) {
      throw new AppError('User not found.', 404)
    }

    return user
  }
}
