import { inject, injectable } from 'tsyringe'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { ListParams } from '@dtos/Commons/ListParams'
import { RolesPaginateParams } from '@dtos/Roles/RolesPaginateParams'

@injectable()
export class ListRolesUseCase {
  constructor(
    @inject('RolesRepository')
    private rolesRepository: IRolesRepository,
  ) {}

  async execute({ page, limit }: ListParams): Promise<RolesPaginateParams> {
    const take = limit
    const skip = (Number(page) - 1) * take

    return await this.rolesRepository.findAll({ page, skip, take })
  }
}
