import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash, verify } from 'argon2';
import { PrismaService } from '../prisma/prisma.service';
import LoginDto from './dto/login.dto';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {

    }
    // 注册
    async register(dto: RegisterDto) {
        const user = await this.prisma.user.create({
            data: {
                name: dto.name,
                password: await hash(dto.password)
            }
        })
        return
    }

    // 登录
    async login(dto: LoginDto) {
        const user = await this.prisma.user.findUnique({
            where: {
                name: dto.name
            }
        })
        // 校验密码
        if (!(await verify(user.password, dto.password))) {
            throw new HttpException({ password: "密码错误" }, HttpStatus.FORBIDDEN)
        }
        return this.token(user)
    }

    // 生成 Jwt Token
    async token({ name, id }) {
        return {
            data: {
                name,
                token: await this.jwt.signAsync({
                    name,
                    sub: id
                })
            }
        }
    }
}
