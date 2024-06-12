import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { DeleteRoleUseCase } from '@useCases/Roles/DeleteRoleUseCase'

export class DeleteRoleController {
  async handle(request: Request, response: Response): Promise<Response> {
    const deleteRoleUseCase = container.resolve(DeleteRoleUseCase)
    const { id } = request.params
    await deleteRoleUseCase.execute({ id })
    return response.json({ message: 'Role successfully removed' })
  }
}
