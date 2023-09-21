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
  //3ea703df-54f7-4721-b0f2-2ee48f8c7449

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('name') name: string,
    @UploadedFile() file: FileDto,
  ): Promise<ResponseDto> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03ab';
    return await this.createCategoryUseCase.execute(clientId, name, file);
  }

  @Get()
  async find(): Promise<ResponseDto[] | []> {
    return await this.getAllCategoriesUseCase.execute();
  }
}
