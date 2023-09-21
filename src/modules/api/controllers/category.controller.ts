import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateCategoryUseCase,
  GetAllCategoriesUseCase,
} from '@application/usecases/category';
import { FileDto } from '@api/DTOs/shared';
import { ResponseDto } from '@api/DTOs/category';
import { CategoryApiPath } from './constants';

@Controller(CategoryApiPath)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('name') name: string,
    @UploadedFile() file: FileDto,
  ): Promise<ResponseDto> {
    return await this.createCategoryUseCase.execute(name, file);
  }

  @Get()
  async find(): Promise<ResponseDto[] | []> {
    return await this.getAllCategoriesUseCase.execute();
  }
}
