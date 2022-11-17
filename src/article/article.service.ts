import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {

  }

  // 添加文章
  async create(createArticleDto: CreateArticleDto) {
    const article = await this.prisma.article.create({
      data: { ...createArticleDto, categoryId: +createArticleDto.categoryId }
    })
    return
  }

  // 文章列表
  async findAll(page: number) {
    // 每页总数
    const pageSize = +process.env.ARTICLE_PAGE_ROW
    // 文章总数
    const total = await this.prisma.article.count()
    const totalPage = Math.ceil(total / pageSize)
    // 文章列表
    const articles = await this.prisma.article.findMany({
      take: pageSize,
      skip: (page - 1) * pageSize,
      orderBy: {
        id: 'desc',
      },
    })
    return {
      meta: { currPage: page, pageSize, total, totalPage },
      data: articles,
    }
  }

  // 文章详情
  async findOne(id: number) {
    const article = await this.prisma.article.findUnique({
      where: { id }
    })
    return { data: article }
  }

  // 修改文章
  async update(id: number, updateArticleDto: UpdateArticleDto) {
    const article = await this.prisma.article.update({
      where: { id },
      data: { ...updateArticleDto, categoryId: +updateArticleDto.categoryId }
    })
    return
  }

  // 删除文章
  async remove(id: number) {
    const article = await this.prisma.article.delete({
      where: { id }
    })
    return
  }
}
