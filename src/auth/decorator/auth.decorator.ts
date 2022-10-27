/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-27 11:15:13
 * @LastEditTime: 2022-10-27 13:41:20
 * @FilePath: /nest-blog/src/auth/decorator/auth.decorator.ts
 * @Description: 聚合装饰器
 * 
 * Copyright (c) 2022 by 儒韵电商, All Rights Reserved. 
 */

import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Role } from "../enum";
import { RoleGuard } from "../guard/role.guard";

export function Auth(...roles: Role[]) {
    /* SetMetadata 设置元数据 */
    return applyDecorators(SetMetadata('roles', roles), UseGuards(AuthGuard('jwt'), RoleGuard))
}