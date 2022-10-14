import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService, private config: ConfigService) {

  }

  // 添加文章
  create(createArticleDto: CreateArticleDto) {
    return 'This action adds a new article';
  }

  // 文章列表
  async findAll(page = 1) {
    // 每页总数
    const pageSize = +this.config.get('ARTICLE_PAGE_ROW')
    // 文章列表
    const articles = await this.prisma.article.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize
    })
    // 文章总数
    const total = await this.prisma.article.count()
    return {
      meta: { currPage: page, pageSize, total, totalPage: Math.ceil(total / pageSize) },
      data: articles,
    }
  }

  // 文章详情
  findOne(id: number) {
    return `This action returns a #${id} article`;
  }

  // 修改文章
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return `This action updates a #${id} article`;
  }

  // 删除文章
  remove(id: number) {
    return `This action removes a #${id} article`;
  }
}
