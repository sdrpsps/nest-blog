/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 11:50:48
 * @LastEditTime: 2022-10-13 16:22:08
 * @FilePath: /nest-blog/src/auth/dto/register.dto.ts
 * @Description: 注册 DTO
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { IsNotEmpty } from "class-validator";
import { IsConfirm } from "src/common/rules/IsConfirm";
import { IsNotExists } from "src/common/rules/IsNotExists";

export default class RegisterDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    @IsNotExists('user', { message: '用户已存在' })
    name: string

    @IsNotEmpty({ message: "密码不能为空" })
    password: string

    @IsNotEmpty({ message: "确认密码不能为空" })
    @IsConfirm({ message: "两次密码不一致" })
    password_confirm: string
}