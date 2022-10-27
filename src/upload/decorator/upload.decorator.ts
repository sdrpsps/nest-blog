/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-27 14:19:25
 * @LastEditTime: 2022-10-27 14:19:54
 * @FilePath: /nest-blog/src/upload/decorator/upload.decorator.ts
 * @Description: 文件上传聚合装饰器
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { applyDecorators, UnsupportedMediaTypeException, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterOptions } from "@nestjs/platform-express/multer/interfaces/multer-options.interface";

export function Upload(fieldName = "file", option: MulterOptions = {}) {
    return applyDecorators(UseInterceptors(FileInterceptor(fieldName, option)))
}

export function fileFilter(type: string) {
    return (req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) => {
        if (!file.mimetype.includes(type)) {
            callback(new UnsupportedMediaTypeException('文件类型错误'), false)
        } else {
            callback(null, true)
        }
    }
}

export function ImageUpload(fieldName = 'file') {
    return Upload(fieldName, {
        fileFilter: fileFilter('image')
    })
}

export function DocUpload(fieldName = 'file') {
    return Upload(fieldName, {
        fileFilter: fileFilter('document')
    })
}