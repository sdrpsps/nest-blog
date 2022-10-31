import { IsNotEmpty } from 'class-validator';

export class UpdateCategoryDto {
    @IsNotEmpty({ message: "栏目标题不能为空" })
    title: string
}
