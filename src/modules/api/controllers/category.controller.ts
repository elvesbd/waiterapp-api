import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
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
import {
  CategoryVMResponse,
  CategoryViewModel,
} from '@api/view-models/category-view-model';
import { DeleteCategoryUseCase } from '@application/usecases/category/delete-category';

@Controller(CategoryApiPath)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('name') name: string,
    @UploadedFile() file: FileDto,
  ): Promise<CategoryVMResponse> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const category = await this.createCategoryUseCase.execute(
      clientId,
      name,
      file,
    );
    return CategoryViewModel.toHTTP(category);
  }

  @Get()
  async getAll(): Promise<ResponseDto[] | []> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const categories = await this.getAllCategoriesUseCase.execute(clientId);
    return CategoryViewModel.toHTTPArray(categories);
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.deleteCategoryUseCase.execute(id, clientId);
  }
}
