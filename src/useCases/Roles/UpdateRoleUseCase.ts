import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Role } from '@entities/Role'
import { UpdateRoleParams } from '@dtos/Roles/UpdateRoleParams'

@injectable()
export class UpdateRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ id, name }: UpdateRoleParams): Promise<Role> {
    const role = await this.rolesRepository.findById(id)
    if (!role) {
      throw new AppError('Role not found.', 404)
    }

    const roleWithSameName = await this.rolesRepository.findByName(name)
    if (roleWithSameName && role.name !== roleWithSameName.name) {
      throw new AppError('Role name already in use.')
    }

    role.name = name
    return this.rolesRepository.save(role)
  }
}
