"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageUploadInterceptor = ImageUploadInterceptor;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const fs_1 = require("fs");
const multer_1 = require("multer");
const path_1 = require("path");
function ImageUploadInterceptor(fieldName, folderName, maxFiles = 10, maxSizeMB = 2) {
    const uploadPath = (0, path_1.join)(process.cwd(), 'uploads', folderName);
    if (!(0, fs_1.existsSync)(uploadPath)) {
        (0, fs_1.mkdirSync)(uploadPath, { recursive: true });
    }
    return (0, platform_express_1.FilesInterceptor)(fieldName, maxFiles, {
        storage: (0, multer_1.diskStorage)({
            destination: uploadPath,
            filename: (_, file, cb) => {
                const uniqueSuffix = `${Date.now()}-${(0, path_1.extname)(file.originalname)}`;
                cb(null, uniqueSuffix);
            },
        }),
        fileFilter: (_, file, cb) => {
            if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|avif|webp)$/)) {
                cb(new common_1.BadRequestException('Only image files are allowed!'), false);
            }
            else {
                cb(null, true);
            }
        },
        limits: { fileSize: maxSizeMB * 1024 * 1024 },
    });
}
//# sourceMappingURL=image-upload.interceptor.js.map