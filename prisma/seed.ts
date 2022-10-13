/*
 * @Author: zhouxiangyang
 * @Email: hchow@hchow.icu
 * @Date: 2022-10-13 10:10:23
 * @LastEditTime: 2022-10-13 11:08:49
 * @FilePath: /nest-blog/prisma/seed.ts
 * @Description: 数据库自动填充数据
 * 
 * Copyright (c) 2022 by 儒韵电商, All Rights Reserved. 
 */
import { PrismaClient } from '@prisma/client'
import { hash } from 'argon2'
import { Random } from 'mockjs'

const prisma = new PrismaClient()
async function run() {
    await prisma.user.create({
        data: {
            name: 'admin',
            password: await hash('123456')
        }
    })

    for (let i = 0; i < 50; i++) {
        await prisma.article.create({
            data: {
                title: Random.ctitle(10, 30),
                content: Random.cparagraph(30, 40)
            }
        })
    }
}

run()