import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { hash } from 'argon2';
import { PrismaService } from 'src/prisma/prisma.service';
import RegisterDto from './dto/register.dto';

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {

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
}
