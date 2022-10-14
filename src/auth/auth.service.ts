import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
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
        const res = {
            success: true,
            code: 201,
            message: "注册成功"
        }
        return res
    }

    // 登录
    async login(dto: LoginDto) {

    }

    // 生成 Jwt Token
    async token({ name, id }) {
        return {
            token: await this.jwt.signAsync({
                name,
                sub: id
            })
        }
    }
}
