/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 14:18:55
 * @LastEditTime: 2022-10-14 15:59:52
 * @FilePath: /nest-blog/src/common/validate.ts
 * @Description: 自定义验证管道
 *
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved.
 */

import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common'

export default class Validate extends ValidationPipe {
  protected flattenValidationErrors(validationErrors: ValidationError[]): string[] {
    const message = {}
    validationErrors.forEach((error) => {
      message[error.property] = Object.values(error.constraints)[0]
    })

    throw new HttpException(message, HttpStatus.UNPROCESSABLE_ENTITY)
  }
}
