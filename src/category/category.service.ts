import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {

  }
  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.prisma.category.create({
      data: {
        title: createCategoryDto.title
      }
    })
    return { message: "添加栏目成功" }
  }

  async findAll() {
    const categories = await this.prisma.category.findMany()
    return { data: categories }
  }

  async findOne(id: number) {
    const category = await this.prisma.category.findUnique({
      where: { id }
    })
    return { data: category }
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.prisma.category.update({
      data: {
        title: updateCategoryDto.title
      },
      where: { id }
    })
    return { message: "修改成功" }
  }

  async remove(id: number) {
    const category = await this.prisma.category.delete({
      where: { id }
    })
    return { message: "删除成功" }
  }
}
