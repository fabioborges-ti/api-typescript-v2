import { inject, injectable } from 'tsyringe'
import { User } from '@entities/User'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { IUserRepository } from '@repositories/interfaces/IUsersRepository'
import { AppError } from '@shared/errors/AppError'
import { hash } from 'bcryptjs'
import { CreateUserParams } from '@dtos/Users/CreateUserParams'

@injectable()
export class CreateUserUseCase {
  constructor(
    @inject('UserRepository') private userRepository: IUserRepository,
    @inject('RolesRepository') private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name, email, password, isAdmin, roleId, role }: CreateUserParams): Promise<User> {
    const emailExists = await this.userRepository.findByEmail(email)
    if (emailExists) {
      throw new AppError('Email address already used.')
    }

    const roleExists = await this.rolesRepository.findById(roleId)
    if (!roleExists) {
      throw new AppError('Role not found.', 404)
    }

    const hashedPassword = await hash(password, 10)
    return await this.userRepository.create({
      name,
      email,
      password: hashedPassword,
      isAdmin,
      roleId,
      role: roleExists,
    })
  }
}
