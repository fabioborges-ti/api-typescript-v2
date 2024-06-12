import { inject, injectable } from 'tsyringe'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcryptjs'
import jwtConfig from '@shared/config/auth'
import { IUserRepository } from '@interfaces/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { UserTokenParams } from '@dtos/Login/UserTokenParams'
import { CreateLoginParams } from '@dtos/Login/CreateLoginParams'

@injectable()
export class CreateLoginUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute({ email, password }: CreateLoginParams): Promise<UserTokenParams> {
    const user = await this.userRepository.findByEmail(email)
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const passwordConfirmed = await compare(password, user.password)
    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const token = sign({}, jwtConfig.jwt.secret, {
      subject: user.id,
      expiresIn: jwtConfig.jwt.expiresIn,
    })

    return { user, token }
  }
}
