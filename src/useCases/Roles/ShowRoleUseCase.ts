import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { AppError } from '@shared/errors/AppError'
import { Role } from '@entities/Role'
import { IdParam } from '@dtos/Commons/IdParam'

@injectable()
export class ShowRoleUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ userId }: IdParam): Promise<Role> {
    const role = await this.rolesRepository.findById(userId)
    if (!role) {
      throw new AppError('Role not found.', 404)
    }
    return role
  }
}
