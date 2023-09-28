import { Injectable } from '@nestjs/common';
import { FileDto } from '@api/DTOs/shared';
import { CreateProductDto } from '@api/DTOs/product';
import { Product } from '@core/domain/entities';
import { FileStorageService } from '@core/domain/storage';
import { ProductRepository } from '@core/domain/repositories';

const PRODUCTS_IMAGE_FOLDER = 'products';

@Injectable()
export class CreateProductUseCase {
  constructor(
    private readonly categoryRepository: ProductRepository,
    private readonly fileStorageService: FileStorageService,
  ) {}

  async execute(
    clientId: string,
    input: CreateProductDto,
    file: FileDto,
  ): Promise<Product> {
    const { name, description, price, ingredients, categoryId } = input;
    const imageUrl = await this.uploadProductImage(clientId, file);

    const product = Product.create({
      name,
      description,
      price,
      ingredients,
      categoryId,
      clientId,
      imageUrl,
    });
    await this.categoryRepository.save(product);
    return product;
  }

  private async uploadProductImage(
    clientId: string,
    file: FileDto,
  ): Promise<string> {
    const { originalname, buffer } = file;
    const path = await this.fileStorageService.upload({
      clientId,
      originalname: originalname,
      imageFolder: PRODUCTS_IMAGE_FOLDER,
      buffer: buffer,
      width: 390,
      height: 200,
    });
    return await this.fileStorageService.getUrl(path);
  }
}
