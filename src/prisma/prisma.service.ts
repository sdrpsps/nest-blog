import { Injectable } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    // 打印执行 SQL 语句
    super({ log: ['query'] })
  }
}
