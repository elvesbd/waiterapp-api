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
  GetAllProductsByCategoryUseCase,
} from '@application/usecases/product';
import { CreateProductDto } from '@api/DTOs/product';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@api/DTOs/shared';
import { ProductApiPath, ProductApiTag } from './constants';
import { ProductVMResponse, ProductViewModel } from '@api/view-models';

@ApiBearerAuth('JWT-auth')
@ApiTags(ProductApiTag)
@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly getAllProductsByCategoryUseCase: GetAllProductsByCategoryUseCase,
  ) {}

  @ApiOperation({ summary: 'create product' })
  @ApiCreatedResponse({ type: ProductVMResponse })
  @ApiBody({ type: CreateProductDto })
  @UseInterceptors(FileInterceptor('file'))
  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: FileDto,
  ): Promise<ProductVMResponse> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const product = await this.createProductUseCase.execute(
      clientId,
      createProductDto,
      file,
    );
    return ProductViewModel.toHTTP(product);
  }

  @ApiOperation({ summary: 'get all products' })
  @ApiOkResponse({ type: [ProductVMResponse] })
  @Get()
  async getAll(): Promise<ProductVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const product = await this.getAllProductsUseCase.execute(clientId);
    return ProductViewModel.toHTTPArray(product);
  }

  @ApiOperation({ summary: 'get all products by category' })
  @ApiParam({
    name: 'id',
    type: String,
    required: true,
  })
  @ApiOkResponse({ type: [ProductVMResponse] })
  @Get('categories/:categoryId')
  async getByCategory(
    @Param('categoryId') categoryId: string,
  ): Promise<ProductVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const products = await this.getAllProductsByCategoryUseCase.execute(
      clientId,
      categoryId,
    );
    return ProductViewModel.toHTTPArray(products);
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
