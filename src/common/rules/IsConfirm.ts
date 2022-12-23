/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 16:10:41
 * @LastEditTime: 2022-10-13 16:51:27
 * @FilePath: /nest-blog/src/common/rules/IsConfirm.ts
 * @Description: 注册接口验证密码和确认密码是否一致
 *
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved.
 */
import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator'

export function IsConfirm(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsConfirm',
      target: object.constructor,
      propertyName: propertyName,
      constraints: [],
      options: validationOptions,
      validator: {
        async validate(value: any, args: ValidationArguments) {
          return Boolean(value === args.object[args.property])
        },
      },
    })
  }
}
