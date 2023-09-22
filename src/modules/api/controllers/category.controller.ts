import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetAllProductsByCategoryUseCase,
  UpdateCategoryUseCase,
} from '@application/usecases/category';
import { FileDto } from '@api/DTOs/shared';
import { ResponseDto, UpdateRequestDto } from '@api/DTOs/category';
import { CategoryApiPath } from './constants';
import {
  CategoryVMResponse,
  CategoryViewModel,
} from '@api/view-models/category-view-model';

@Controller(CategoryApiPath)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly updateCategoryUseCase: UpdateCategoryUseCase,
    private readonly getAllProductsByCategoryUseCase: GetAllProductsByCategoryUseCase,
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

  @Get(':id/products')
  async getByCategory(@Param('id') id: string): Promise<any> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03ab';
    return await this.getAllProductsByCategoryUseCase.execute(clientId, id);
  }

  @HttpCode(204)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
  ): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.updateCategoryUseCase.execute({
      id,
      clientId,
      ...updateRequestDto,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.deleteCategoryUseCase.execute(id, clientId);
  }
}
