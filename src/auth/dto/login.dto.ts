/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 11:51:07
 * @LastEditTime: 2022-10-13 13:20:54
 * @FilePath: /nest-blog/src/auth/dto/login.dto.ts
 * @Description: 登录 DTO
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { IsNotEmpty } from "class-validator"

export default class LoginDto {
    @IsNotEmpty({ message: "用户名不能为空" })
    name: string

    @IsNotEmpty({ message: "密码不能为空" })
    password: string
}