import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Post,
  UploadedFile,
} from '@nestjs/common';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
} from '@application/usecases/product';
import { FileDto, ApiResponse } from '@api/DTOs/shared';
import { CreateProductDto, ProductResponseDto } from '@api/DTOs/product';
import { ProductApiPath } from './constants';

@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @UploadedFile() file: FileDto,
  ): Promise<ApiResponse<ProductResponseDto>> {
    try {
      const product = await this.createProductUseCase.execute(
        createProductDto,
        file,
      );
      return new ApiResponse(product, HttpStatus.CREATED, 'Sucesso');
    } catch (error) {
      return new ApiResponse(
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
  }

  @Get()
  async getAll(): Promise<ApiResponse<ProductResponseDto[]> | []> {
    try {
      const products = await this.getAllProductsUseCase.execute();
      return new ApiResponse(products, HttpStatus.CREATED, 'Sucesso');
    } catch (error) {
      return new ApiResponse(
        undefined,
        HttpStatus.INTERNAL_SERVER_ERROR,
        error.message,
      );
    }
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
