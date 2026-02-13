import { Injectable, Logger } from '@nestjs/common';
import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';

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

  getUploadPath() {
    return this.uploadPath;
  }
}
