import { ConfigService } from '@nestjs/config'
/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-24 14:23:47
 * @LastEditTime: 2022-10-24 14:26:51
 * @FilePath: /nest-blog/src/auth/strategy/jwt.strategy.ts
 * @Description: jwt 认证策略
 *
 * Copyright (c) 2022 by sdrpsps, All Rights Reserved.
 */
import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { PrismaService } from '../../prisma/prisma.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private prisma: PrismaService, private config: ConfigService) {
    super({
      //解析用户提交的header中的Bearer Token数据
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //加密码的 secret
      secretOrKey: config.get('TOKEN_SECRET'),
    })
  }

  //验证通过后获取用户资料
  async validate({ sub: id }) {
    return this.prisma.user.findUnique({
      where: { id },
    })
  }
}
