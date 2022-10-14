/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-14 10:28:26
 * @LastEditTime: 2022-10-14 14:03:38
 * @FilePath: /nest-blog/src/transform.interceptor.ts
 * @Description: 全局拦截器
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { map } from 'rxjs/operators'

@Injectable()
export class TransformInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler) {
        
        const statusCode = context.switchToHttp().getResponse().statusCode
        return next.handle().pipe(
            map((data) => {
                console.log(data);
                return {
                    statusCode,
                    success: true,
                    data,
                }
            }),
        )
    }
}