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
import { ApiTags } from '@nestjs/swagger';
import {
  CreateProductUseCase,
  GetAllProductsUseCase,
  UpdateProductUseCase,
  DeleteProductUseCase,
} from '@application/usecases/product';
import {
  ProductVMResponse,
  ProductViewModel,
} from '@api/view-models/product-view-model';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileDto } from '@api/DTOs/shared';
import { CreateProductDto, UpdateRequestDto } from '@api/DTOs/product';
import { ProductApiPath, ProductApiTag } from './constants';

@ApiTags(ProductApiTag)
@Controller(ProductApiPath)
export class ProductController {
  constructor(
    private readonly createProductUseCase: CreateProductUseCase,
    private readonly getAllProductsUseCase: GetAllProductsUseCase,
    private readonly deleteProductUseCase: DeleteProductUseCase,
    private readonly updateProductUseCase: UpdateProductUseCase,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
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

  @Get()
  async getAll(): Promise<ProductVMResponse[]> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03ab';
    const products = await this.getAllProductsUseCase.execute(clientId);
    return ProductViewModel.toHTTPArray(products);
  }

  @HttpCode(204)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: string,
    @Body() updateRequestDto: UpdateRequestDto,
    @UploadedFile() file?: FileDto,
  ): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.updateProductUseCase.execute(id, {
      clientId,
      ...updateRequestDto,
      ...file,
    });
  }

  @HttpCode(204)
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    const clientId = '04a3e89e-cd64-4823-8c3d-da1cbd3c03cd';
    await this.deleteProductUseCase.execute(id, clientId);
  }
}
