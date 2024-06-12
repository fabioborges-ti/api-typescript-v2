import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Role } from '@entities/Role'
import { CreateRoleParams } from '@dtos/Roles/CreateRoleParams'

@injectable()
export class CreateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ name }: CreateRoleParams): Promise<Role> {
    const roleAlreadyExists = await this.rolesRepository.findByName(name)
    if (roleAlreadyExists) {
      throw new AppError('Role already exists')
    }
    return this.rolesRepository.create({ name })
  }
}
