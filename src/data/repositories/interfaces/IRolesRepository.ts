import { PaginateParamsDto } from '@entities/interfaces/Commons/PaginateParamsDto'
import { CreateRoleDto } from '@entities/interfaces/Roles/CreateRoleDto'
import { RolesPaginateDto } from '@shared/interfaces/Roles/RolesPaginateDto'
import { Role } from '@entities/Role'

interface IRolesRepository {
  create({ name }: CreateRoleDto): Promise<Role>
  save(role: Role): Promise<Role>
  findAll({ page, skip, take }: PaginateParamsDto): Promise<RolesPaginateDto>
  findById(id: string): Promise<Role | null>
  findByName(name: string): Promise<Role | null>
  delete(role: Role): Promise<void>
}

export { IRolesRepository }
