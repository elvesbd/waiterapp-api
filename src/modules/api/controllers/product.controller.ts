import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  UploadedFile,
} from '@nestjs/common';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
} from '@application/usecases/product';
import { FileDto } from '@api/DTOs/shared';
import { RequestDto, ResponseDto } from '@api/DTOs/product';
import { ProductApiPath } from './constants';

@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
  ) {}

  @Post()
  async create(
    @Body() requestDto: RequestDto,
    @UploadedFile() file: FileDto,
  ): Promise<ResponseDto> {
    return await this.createProductUseCase.execute(requestDto, file);
  }

  @Get()
  async getAll(): Promise<ResponseDto[] | []> {
    return await this.getAllProductsUseCase.execute();
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
