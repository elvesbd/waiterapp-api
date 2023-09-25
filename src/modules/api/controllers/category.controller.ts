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
import {
  ApiBody,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetAllCategoriesUseCase,
  GetAllProductsByCategoryUseCase,
} from '@application/usecases/category';
import { FileDto } from '@api/DTOs/shared';
import { CategoryApiPath, CategoryApiTag } from './constants';
import {
  CategoryResponseDto,
  GetAllProductsByCategoryResponseDto,
} from '@api/DTOs/category';

@ApiTags(CategoryApiTag)
@Controller(CategoryApiPath)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
    private readonly getAllProductsByCategoryUseCase: GetAllProductsByCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'create category' })
  @ApiCreatedResponse({ type: CategoryResponseDto })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        file: {
          type: 'object',
          properties: {
            fieldname: { type: 'string' },
            originalname: { type: 'string' },
            mimetype: { type: 'string' },
            buffer: { type: 'object', format: 'binary' },
            size: { type: 'number' },
          },
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body('name') name: string,
    @UploadedFile() file: FileDto,
  ): Promise<CategoryResponseDto> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.createCategoryUseCase.execute(clientId, name, file);
  }

  @ApiOperation({ summary: 'get all categories' })
  @ApiOkResponse({ type: [CategoryResponseDto] })
  @Get()
  async getAll(): Promise<CategoryResponseDto[] | []> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.getAllCategoriesUseCase.execute(clientId);
  }

  @ApiOperation({ summary: 'get all products by category' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({ type: GetAllProductsByCategoryResponseDto })
  @Get(':id/products')
  async getByCategory(
    @Param('id') id: string,
  ): Promise<GetAllProductsByCategoryResponseDto[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.getAllProductsByCategoryUseCase.execute(clientId, id);
  }

  @ApiOperation({ summary: 'delete category' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiNoContentResponse()
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.deleteCategoryUseCase.execute(clientId, id);
  }
}
