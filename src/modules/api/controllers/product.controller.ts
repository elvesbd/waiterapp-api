import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
} from '@application/usecases/product';
import { FileDto } from '@api/DTOs/shared';
import { CreateProductDto } from '@api/DTOs/product';
import { ProductApiPath } from './constants';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ProductVMResponse,
  ProductViewModel,
} from '@api/view-models/product-view-model';

@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: FileDto,
  ): Promise<ProductVMResponse> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03ab';
    const product = await this.createProductUseCase.execute(
      clientId,
      createProductDto,
      file,
    );
    return ProductViewModel.toHTTP(product);
  }

  @Get()
  async getAll(): Promise<ProductVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    const products = await this.getAllProductsUseCase.execute(clientId);
    return ProductViewModel.toHTTPArray(products);
  }

  @Get('category/:categoryId')
  async getByCategory(): Promise<any> {
    return 'GetAllProductsByCategoryController';
  }

  @Delete(':productId')
  async remove(): Promise<any> {
    return 'DeleteProductController';
  }
}
