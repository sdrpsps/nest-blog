import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import LoginDto from './dto/login.dto'
import RegisterDto from './dto/register.dto'

@Controller()
export class AuthController {
  constructor(private auth: AuthService) {}

  // 注册
  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.auth.register(dto)
  }

  // 登录
  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.auth.login(dto)
  }
}
