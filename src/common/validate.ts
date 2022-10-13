/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 14:18:55
 * @LastEditTime: 2022-10-13 16:01:43
 * @FilePath: /nest-blog/src/common/validate.ts
 * @Description: 自定义验证管道
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */

import { HttpException, HttpStatus, ValidationError, ValidationPipe } from "@nestjs/common";


export default class Validate extends ValidationPipe {
    protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
        const message = {}
        validationErrors.forEach((error) => {
            message[error.property] = Object.values(error.constraints)[0]
        })

        throw new HttpException({
            success: false,
            code: 422,
            message
        },
            HttpStatus.UNPROCESSABLE_ENTITY)
    }
}