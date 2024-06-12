import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { UpdateAvatarUseCase } from '@useCases/Users/UpdateAvatarUseCase'

export class UpdateAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const updateAvatarUseCase = container.resolve(UpdateAvatarUseCase)
    const userId = request.user.id
    const avatarFilename = request.file.filename
    const user = await updateAvatarUseCase.execute({ userId, avatarFilename })
    return response.json(instanceToInstance(user))
  }
}
