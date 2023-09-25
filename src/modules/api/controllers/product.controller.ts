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
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  DeleteProductUseCase,
} from '@application/usecases/product';
import { CreateProductDto, ProductResponseDto } from '@api/DTOs/product';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@api/DTOs/shared';
import { ProductApiPath, ProductApiTag } from './constants';

@ApiBearerAuth('JWT-auth')
@ApiTags(ProductApiTag)
@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
  ) {}

  @ApiOperation({ summary: 'create product' })
  @ApiCreatedResponse({ type: ProductResponseDto })
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: FileDto,
  ): Promise<ProductResponseDto> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.createProductUseCase.execute(
      clientId,
      createProductDto,
      file,
    );
  }

  @ApiOperation({ summary: 'get all products' })
  @ApiOkResponse({ type: [ProductResponseDto] })
  @Get()
  async getAll(): Promise<ProductResponseDto[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    return await this.getAllProductsUseCase.execute(clientId);
  }

  @ApiOperation({ summary: 'delete product' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.deleteProductUseCase.execute(id, clientId);
  }
}
