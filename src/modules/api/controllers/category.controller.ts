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
  ApiBearerAuth,
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
} from '@core/usecases/category';
import { FileDto } from '@api/DTOs/shared';
import { CategoryApiPath, CategoryApiTag } from './constants';
import { CategoryVMResponse, CategoryViewModel } from '@api/view-models';

@ApiBearerAuth('JWT-auth')
@ApiTags(CategoryApiTag)
@Controller(CategoryApiPath)
export class CategoryController {
  constructor(
    private readonly createCategoryUseCase: CreateCategoryUseCase,
    private readonly getAllCategoriesUseCase: GetAllCategoriesUseCase,
    private readonly deleteCategoryUseCase: DeleteCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'create category' })
  @ApiCreatedResponse({ type: CategoryVMResponse })
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
  ): Promise<CategoryVMResponse> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const category = await this.createCategoryUseCase.execute(
      clientId,
      name,
      file,
    );
    return CategoryViewModel.toHTTP(category);
  }

  @ApiOperation({ summary: 'get all categories' })
  @ApiOkResponse({ type: [CategoryVMResponse] })
  @Get()
  async getAll(): Promise<CategoryVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const categories = await this.getAllCategoriesUseCase.execute(clientId);
    return CategoryViewModel.toHTTPArray(categories);
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
