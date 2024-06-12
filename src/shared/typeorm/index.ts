import { Role } from '@entities/Role'
import { User } from '@entities/User'
import { CreateRolesTable1717944495493 } from '@migrations/1717944495493-CreateRolesTable'
import { CreateUsersTable1718019147970 } from '@migrations/1718019147970-CreateUsersTable'
import { AddRoleIdToUsersTable1718024707995 } from '@migrations/1718024707995-AddRoleIdToUsersTable'
import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'sqlite',
  database: './src/data/db/db.sqlite',
  entities: [Role, User],
  migrations: [CreateRolesTable1717944495493, CreateUsersTable1718019147970, AddRoleIdToUsersTable1718024707995],
})

export { dataSource }
