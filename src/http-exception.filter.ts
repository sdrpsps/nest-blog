/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-14 11:33:51
 * @LastEditTime: 2022-10-14 13:34:27
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
    const data = exception.getResponse()

    response
      .status(status)
      .json({
        statusCode: status,
        success: false,
        data: data,
        timestamp: new Date().getTime(),
        path: request.url,
      });
  }
}