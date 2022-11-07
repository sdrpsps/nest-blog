import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { PrismaModule } from './prisma/prisma.module';
import { UploadModule } from './upload/upload.module';


@Module({
  imports: [AuthModule, PrismaModule, ArticleModule,  CategoryModule, UploadModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
