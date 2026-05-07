import { BadRequestException } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname, join } from 'path';

export function ImageUploadInterceptor(
  fieldName: string,
  folderName: string,
  maxFiles = 10,
  maxSizeMB = 2,
) {
  const uploadPath = join(process.cwd(), 'uploads', folderName);

  if (!existsSync(uploadPath)) {
    mkdirSync(uploadPath, { recursive: true });
  }

  return FilesInterceptor(fieldName, maxFiles, {
    storage: diskStorage({
      destination: uploadPath,
      filename: (_, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${extname(file.originalname)}`;
        cb(null, uniqueSuffix);
      },
    }),
    fileFilter: (_, file, cb) => {
      if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|avif|webp)$/)) {
        cb(new BadRequestException('Only image files are allowed!'), false);
      } else {
        cb(null, true);
      }
    },
    limits: { fileSize: maxSizeMB * 1024 * 1024 },
  });
}
