import { inject, injectable } from 'tsyringe'
import path from 'node:path'
import fs from 'node:fs'
import uploadConfig from '@config/upload'
import { IUserRepository } from '@interfaces/IUsersRepository'
import { User } from '@entities/User'
import { AppError } from '@shared/errors/AppError'
import { UpdateAvatarParams } from '@dtos/Users/UpdateAvatarParams'

@injectable()
export class UpdateAvatarUseCase {
  constructor(@inject('UserRepository') private userRepository: IUserRepository) {}

  async execute({ userId, avatarFilename }: UpdateAvatarParams): Promise<User> {
    const user = await this.userRepository.findById(userId)

    if (!user) {
      throw new AppError('Only authenticated users can chances avatar.', 401)
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar)

      try {
        // Verifica a existência do arquivo
        await fs.promises.access(userAvatarFilePath)
        console.log(`Arquivo encontrado: ${userAvatarFilePath}`)

        // Remove o arquivo
        await fs.promises.unlink(userAvatarFilePath)
        console.log(`Arquivo removido com sucesso: ${userAvatarFilePath}`)
      } catch (err) {
        if (err.code === 'ENOENT') {
          console.log(`Arquivo não encontrado: ${userAvatarFilePath}`)
        } else {
          console.error(`Erro ao acessar ou remover o arquivo: ${err.message}`)
        }
      }
    }

    user.avatar = avatarFilename

    return await this.userRepository.save(user)
  }
}
