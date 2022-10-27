/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-14 11:33:51
 * @LastEditTime: 2022-10-27 17:35:45
 * @FilePath: /nest-blog/src/http-exception.filter.ts
 * @Description: 全局异常过滤器
 * 
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved. 
 */
import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const message = exception.getResponse()

    response
      .status(status)
      .json({
        meta: {
          code: status,
          success: false,
          message
        },
        data: null
      });
  }
}