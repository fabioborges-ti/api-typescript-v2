import { PaginateParamsDto } from '@entities/interfaces/Commons/PaginateParamsDto'
import { CreateRoleDto } from '@entities/interfaces/Roles/CreateRoleDto'
import { RolesPaginateDto } from '@shared/interfaces/Roles/RolesPaginateDto'
import { Role } from '@entities/Role'
import { IRolesRepository } from '@repositories/interfaces/IRolesRepository'
import { dataSource } from '@shared/typeorm'
import { Repository } from 'typeorm'

export class RolesRepository implements IRolesRepository {
  private repository: Repository<Role>

  constructor() {
    this.repository = dataSource.getRepository(Role)
  }

  async create({ name }: CreateRoleDto): Promise<Role> {
    const role = this.repository.create({ name })
    return await this.repository.save(role)
  }

  async save(role: Role): Promise<Role> {
    return await this.repository.save(role)
  }

  async delete(role: Role): Promise<void> {
    await this.repository.remove(role)
  }

  async findAll({ page, skip, take }: PaginateParamsDto): Promise<RolesPaginateDto> {
    const [roles, count] = await this.repository.createQueryBuilder().skip(skip).take(take).getManyAndCount()
    const result = {
      per_page: take,
      total: count,
      current_page: page,
      data: roles,
    }

    return result
  }

  async findByName(name: string): Promise<Role | null> {
    return await this.repository.findOneBy({ name })
  }

  async findById(id: string): Promise<Role | null> {
    return await this.repository.findOneBy({ id })
  }
}
