import multer from 'multer'
import path from 'node:path'
import crypto from 'node:crypto'
import { UploadConfigParams } from '@dtos/Commons/UploadConfigParams'

const uploadFolder = path.resolve(__dirname, '..', '..', 'uploads')

export default {
  directory: uploadFolder,
  storage: multer.diskStorage({
    destination: uploadFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const filename = `${fileHash}_${file.originalname.replace(/\s+/g, '')}`
      callback(null, filename)
    },
  }),
} as UploadConfigParams
