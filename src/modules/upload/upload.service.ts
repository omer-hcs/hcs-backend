import { Injectable, Logger } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

@Injectable()
export class UploadService {
  private readonly uploadPath = join(process.cwd(), 'uploads');
  private readonly logger = new Logger(UploadService.name);

  constructor() {
    this.ensureUploadDirExists();
  }

  private ensureUploadDirExists() {
    try {
      if (!existsSync(this.uploadPath)) {
        mkdirSync(this.uploadPath, { recursive: true });
      }
    } catch (error: any) {
      if (error.code === 'EROFS') {
        this.logger.warn('Cannot create uploads directory: Read-only file system. Uploads will not be persisted to disk.');
      } else {
        this.logger.error(`Failed to create uploads directory: ${error.message}`);
      }
    }
  }

  async uploadImage(file: Express.Multer.File): Promise<any> {
    return new Promise((resolve, reject) => {
      const upload = cloudinary.uploader.upload_stream(
        {
          folder: 'hearing-care-service',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve(result);
        },
      );

      const stream = Readable.from(file.buffer);
      stream.pipe(upload);
    });
  }

  getUploadPath() {
    return this.uploadPath;
  }
}
