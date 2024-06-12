import { StorageEngine } from 'multer'

interface UploadConfigParams {
  directory: string
  storage: StorageEngine
}

export { UploadConfigParams }
