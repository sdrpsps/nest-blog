import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty } from 'class-validator';
import { CreateArticleDto } from './create-article.dto';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
    @IsNotEmpty({ message: "标题不能为空" })
    title: string

    @IsNotEmpty({ message: "内容不能为空" })
    content: string

    @IsNotEmpty({ message: "栏目ID不能为空" })
    categoryId: number
}
