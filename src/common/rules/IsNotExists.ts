/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 14:36:20
 * @LastEditTime: 2022-10-13 16:14:19
 * @FilePath: /nest-blog/src/common/rules/IsNotExists.ts
 * @Description: 查找数据库中是否存在用户
 *
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved.
 */
import { PrismaClient } from '@prisma/client'
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsNotExists(property: string, validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsNotExists',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          const prisma = new PrismaClient()
          const res = await prisma.user.findFirst({
            where: {
              name: value,
            },
          })
          return !Boolean(res)
        },
      },
    })
  }
}
