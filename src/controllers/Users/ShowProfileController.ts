import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { instanceToInstance } from 'class-transformer'
import { ShowProfileUseCase } from '@useCases/Users/ShowProfileUseCase'

export class ShowProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const showProfileUseCase = container.resolve(ShowProfileUseCase)
    const { userId } = request.body
    const user = await showProfileUseCase.execute({ userId })
    return response.json(instanceToInstance(user))
  }
}
