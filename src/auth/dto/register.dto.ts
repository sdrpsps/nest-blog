/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 11:50:48
 * @LastEditTime: 2022-10-13 13:29:17
 * @FilePath: /nest-blog/src/auth/dto/register.dto.ts
 * @Description: 注册 DTO
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { IsNotEmpty } from "class-validator";

export default class RegisterDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    name: string

    @IsNotEmpty({ message: "密码不能为空" })
    password: string

    @IsNotEmpty({ message: "确认密码不能为空" })
    password_confirmed: string
}