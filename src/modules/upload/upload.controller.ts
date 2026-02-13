import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';
import { AdminGuard } from '../../common/guards/admin.guard';

@Controller('upload')
@UseGuards(AdminGuard)
export class UploadController {
  @Post()
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new HttpException(
              'Only image files are allowed!',
              HttpStatus.BAD_REQUEST,
            ),
            false,
          );
        }
        cb(null, true);
      },
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new HttpException('File is required', HttpStatus.BAD_REQUEST);
    }

    // Return file metadata since we are not persisting to disk
    // In production, you would upload file.buffer to S3/Cloudinary here
    return {
      name: file.originalname,
      size: file.size,
      mimetype: file.mimetype,
      message: 'File uploaded to memory. Implement S3/Cloudinary storage for persistence.',
    };
  }
}
