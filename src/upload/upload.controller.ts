import { BadRequestException, Controller, Post, UploadedFile } from '@nestjs/common'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { DocUpload, ImageUpload } from './decorator/upload.decorator'

@Controller('upload')
export class UploadController {
  @Post('image')
  @Auth()
  @ImageUpload()
  images(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file不能为空')
    }
    return { data: file }
  }

  @Post('doc')
  @Auth()
  @DocUpload()
  doc(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('file不能为空')
    }
    return { data: file }
  }
}
