import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post, Query } from '@nestjs/common'
import { Auth } from 'src/auth/decorator/auth.decorator'
import { Role } from 'src/auth/enum'
import { ArticleService } from './article.service'
import { CreateArticleDto } from './dto/create-article.dto'
import { UpdateArticleDto } from './dto/update-article.dto'

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  // 添加文章
  @Post()
  @Auth(Role.ADMIN, Role.EDITOR)
  create(@Body() createArticleDto: CreateArticleDto) {
    return this.articleService.create(createArticleDto)
  }

  // 文章列表
  @Get()
  findAll(@Query('page') page: string) {
    if (!page) page = '1'
    return this.articleService.findAll(+page)
  }

  // 文章详情
  @Get(':id')
  findOne(@Param('id') id: string) {
    if (isNaN(+id)) {
      throw new HttpException({ id: '参数只能为数字' }, HttpStatus.UNPROCESSABLE_ENTITY)
    }
    return this.articleService.findOne(+id)
  }

  // 修改文章
  @Patch(':id')
  @Auth(Role.ADMIN, Role.EDITOR)
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articleService.update(+id, updateArticleDto)
  }

  // 删除文章
  @Delete(':id')
  @Auth(Role.ADMIN, Role.EDITOR)
  remove(@Param('id') id: string) {
    return this.articleService.remove(+id)
  }
}
